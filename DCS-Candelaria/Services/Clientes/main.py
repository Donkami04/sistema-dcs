import warnings, requests, os, time, traceback, datetime, sched, re
import mysql.connector
from dotenv import load_dotenv

# Esto evita que las respuestas de las API tengan warnings.
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

def clients():
    mydb = mysql.connector.connect(
    host="db", #! Cambiar a 'db' o logica para cambiar dependiendo
    user="candelaria",
    password="candelaria",
    database="dcs"
    )
    cursor = mydb.cursor()

    # Realizar una consulta para leer información de la base de datos
    query = "SELECT * FROM data_clients"
    cursor.execute(query)

    # Obtener los nombres de las columnas
    column_names = [column[0] for column in cursor.description]

    # Convertir los resultados a una lista de diccionarios
    clients = []
    for row in cursor:
        row_dict = {}
        for i in range(len(column_names)):
            row_dict[column_names[i]] = row[i]
        clients.append(row_dict)

    try:
        load_dotenv()
        
        for element in clients:
            group = element['group']
            ip = element['ip']
            name = element['name']
            description = element['description']
            clave = element['clave']
            importancia = element['importancia']
            id_device_prtg = element['id_prtg']
            cisco_id_client = element['id_cisco']
            print(f'{ip} --> {name}')
            
            # Inicia bloque para consultar datos a la API PRTG
            # Si no hay ID se definen las variables como Not Found y no hace peticion GET
            if id_device_prtg == 'Not Found':
                status_prtg = 'Not Found'
                last_up_prtg = 'Not Found'
                last_down_prtg = 'Not Found'
            else:
                URL_PRTG_ID = os.getenv('URL_PRTG_ID').format(id_device=id_device_prtg)
                # prtg_sensor = URL_PRTG_ID
                prtg_data = requests.get(URL_PRTG_ID, verify=False).json()
                sensor = prtg_data['sensors'][0]
                status_prtg = sensor['status']
                last_up_prtg = sensor['lastup']
                last_down_prtg = sensor['lastdown']
                patron = re.compile(r'<.*?>') # Se usa para formatear el last_up y last_down
                last_up_prtg =  re.sub(patron, '', last_up_prtg)
                last_down_prtg =  re.sub(patron, '', last_down_prtg)
                
            # Inicia bloque para consultar datos a la API CISCO PRIME
            # Si no hay ID se definen las variables como Not Found y no hace peticion GET
            if cisco_id_client == 'Not Found':
                cisco_client_port = 'Not Found'
                cisco_client_status = 'Not Found'
                cisco_device_name = 'Not Found'
                cisco_device_ip_adrress = 'Not Found'
                cisco_device_reachability = 'Not Found'
                prtg_device_status = 'Not Found'
            else:
                URL_CISCO_ID = os.getenv('URL_CISCO_ID').format(cisco_id_client=cisco_id_client)
                cisco_client_response = requests.get(URL_CISCO_ID, verify=False).json()
                cisco_client_data = cisco_client_response['queryResponse']['entity'][0]['clientsDTO']
                cisco_client_port = cisco_client_data['clientInterface']
                cisco_client_status = cisco_client_data['status']
                
                cisco_device_name = cisco_client_data['deviceName']
                cisco_device_ip_adrress = cisco_client_data['deviceIpAddress']['address']
                
                # Con el 'cisco_device_ip_adrress' se busca encontrar el Status PRTG del SW. 
                # Obtener el ID del PRTG mediante esta IP
                # Obtener el status del PRTG mediante el ID obtenido anteriormente
                prtg_device_ip_url = os.getenv('URL_PRTG_IP').format(ip=cisco_device_ip_adrress)
                prtg_device_ip_response = requests.get(prtg_device_ip_url, verify=False).json()
                
                if prtg_device_ip_response['treesize'] == 0:
                    prtg_device_status = 'Not Found'
                
                else:
                    prtg_device_id = prtg_device_ip_response['devices'][0]['objid']
                    prtg_device_id_url = os.getenv('URL_PRTG_ID').format(id_device=prtg_device_id)
                    prtg_device_status_response = requests.get(prtg_device_id_url, verify=False).json()
                    prtg_device_status = prtg_device_status_response['sensors'][0]['status']
                
                # Con el 'cisco_device_ip_adrress' de la API de cisco se obtiene el id del CISCO
                # Y posteriormente se obtiene el 'REACHABILITY' del CISCO
                cisco_device_ip_url = os.getenv('URL_CISCO_IP_DEVICE').format(ip=cisco_device_ip_adrress)
                cisco_device_ip_response = requests.get(cisco_device_ip_url, verify=False).json()
                if cisco_device_ip_response['queryResponse']['@count'] == 0:
                    cisco_device_reachability = 'Not Found'
                else:
                    cisco_device_id = cisco_device_ip_response['queryResponse']['entityId'][0]['$']
                    cisco_device_id_url = os.getenv('URL_CISCO_ID_DEVICE').format(id_device=cisco_device_id)
                    cisco_device_id_response = requests.get(cisco_device_id_url, verify=False).json()
                    cisco_device_reachability = cisco_device_id_response['queryResponse']['entity'][0]['devicesDTO']['reachability']

            # Inicia bloque para almacenar la informacion procesada en la base de datos
            # Dependiendo del tipo de grupo se almacena en la tabla CSP, CSS, CNP, CNS, HSE, CNPB o CNSB
            group_low = group.lower()
            query = (f"INSERT INTO dcs.{group_low} (name, `group`, description, ip, status_prtg, lastup_prtg, lastdown_prtg, device_ip_cisco, device_cisco, port_cisco, status_cisco, reachability_cisco, id_prtg, importancia, clave, status_device_cisco)"
                f"VALUES ('{name}', '{group}', '{description}', '{ip}', '{status_prtg}', '{last_up_prtg}', '{last_down_prtg}', '{cisco_device_ip_adrress}', '{cisco_device_name}', '{cisco_client_port}', '{cisco_client_status}', '{cisco_device_reachability}', '{id_device_prtg}', '{importancia}', '{clave}', '{prtg_device_status}')")
            cursor.execute(query)
            mydb.commit()
                
        # Bloque para guardar el datetime de la ultima consulta en la tabla 'fechas_consultas_clientes'.         
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        cursor.execute(f"INSERT INTO dcs.fechas_consultas_clientes (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'OK')")
        mydb.commit()
        
        # with open("/home/donkami/Sona/APIS/DCS-Candelaria/Services/Clientes/logs.txt", "a") as archivo:
        with open("/app/logs.txt", "a") as archivo:
            archivo.write(str(fecha_y_hora) + '\n')
                
        print('Terminado')       
                
    except Exception:
        print(traceback.format_exc())
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        cursor.execute(f"INSERT INTO dcs.fechas_consultas_clientes (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'ERROR')")
        mydb.commit()
        # with open("/home/donkami/Sona/APIS/DCS-Candelaria/Services/Clientes/logs.txt", "a") as archivo:
        with open("/app/logs.txt", "a") as archivo:
            archivo.write('Fecha y hora del error: ' + str(fecha_y_hora) + ' Dispositivo del error ---> ' + ip + '\n')
            archivo.write(traceback.format_exc())
            archivo.write("\n")
                
                
def bucle(scheduler):
    clients()
    scheduler.enter(300, 1, bucle, (scheduler,))

if __name__ == '__main__':
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()