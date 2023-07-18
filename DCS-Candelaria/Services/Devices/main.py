import warnings, requests, os, time, traceback, datetime, sched, re,logging
import mysql.connector
from dotenv import load_dotenv
from config import database

# Esto evita que las respuestas de las API tengan warnings.
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
file_handler = logging.FileHandler('issues.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logging.getLogger().addHandler(file_handler)

def get_devices_data():
    load_dotenv()
    # env = os.getenv('ENVIRONMENT')
    
    # if env == 'local':
    #     mydb = mysql.connector.connect(
    #     host=database['local']['DB_HOST'],
    #     user=database['local']['DB_USER'],
    #     password=database['local']['DB_PASSWORD'],
    #     database=database['local']['DB_DATABASE']
    #     )
        
    # if env == 'production':
    #     mydb = mysql.connector.connect(
    #     host=database['production']['DB_HOST'],
    #     user=database['production']['DB_USER'],
    #     password=database['production']['DB_PASSWORD'],
    #     database=database['production']['DB_DATABASE']
    #     )
        
    # cursor = mydb.cursor()

    # # Realizar una consulta para leer información de la base de datos
    # query = "SELECT * FROM data_clients"
    # cursor.execute(query)

    # # Obtener los nombres de las columnas
    # column_names = [column[0] for column in cursor.description]

    # Convertir los resultados a una lista de diccionarios
    # clients = []
    # for row in cursor:
    #     row_dict = {}
    #     for i in range(len(column_names)):
    #         row_dict[column_names[i]] = row[i]
    #     clients.append(row_dict)
    
    devices = [
        {
            'ip_device':'10.224.73.246',
            'type':'Camara',
            'site':'Concentradora',
            'dpto':'Operaciones Concentradora'
        },
        {
            'ip_device':'10.224.4.147',
            'type':'AP',
            'site':'Dique Mina',
            'dpto':'TICA'
        },
    ]

    try:   
        for device in devices:
            ip_device = device['ip_device']
            device_type = device['type']
            site = device['site']
            ubication = device['dpto']
            
            URL_GET_ID = os.getenv('URL_PRTG_IP').format(ip=ip_device)
            response_get_id = requests.get(URL_GET_ID, verify=False).json()
            if len(response_get_id['devices'][0]) == 0:
                prtg_device = 'Not Found'
                prtg_id_device = 'Not Found'
                prtg_name_sensor = 'Not Found'
                prtg_status = 'Not Found'
                prtg_lastup = 'Not Found'
                prtg_lastdown = 'Not Found'
                logging.info(prtg_device)
                logging.info(prtg_id_device)
                logging.info(prtg_name_sensor)
                logging.info(prtg_status)
                logging.info(prtg_lastup)
                logging.info(prtg_lastdown)
            else:
                prtg_id_device = response_get_id['devices'][0]['objid']
                URL_PRTG_GET_DATA = os.getenv('URL_PRTG_ID').format(id_device=prtg_id_device)
                response_prtg_data = requests.get(URL_PRTG_GET_DATA, verify=False).json()
                sensor = response_prtg_data['sensors'][0]
                prtg_name_sensor = sensor['name']
                prtg_device = sensor['device']
                prtg_status = sensor['status']
                prtg_lastup = sensor['lastup']
                prtg_lastdown = sensor['lastdown']
                
                patron = re.compile(r'<.*?>') # Se usa para formatear el last_up y last_down
                prtg_lastup =  re.sub(patron, '', prtg_lastup)
                prtg_lastdown =  re.sub(patron, '', prtg_lastdown)
                logging.info(prtg_name_sensor)
                logging.info(prtg_device)
                logging.info(prtg_status)
                logging.info(prtg_lastup)
                logging.info(prtg_lastdown)

            # if cisco_id_client == 'Not Found':
            #     cisco_client_port = 'Not Found'
            #     cisco_client_status = 'Not Found'
            #     cisco_device_name = 'Not Found'
            #     cisco_device_ip_adrress = 'Not Found'
            #     cisco_device_reachability = 'Not Found'
            #     prtg_device_status = 'Not Found'
            # else:
            #     URL_CISCO_ID = os.getenv('URL_CISCO_ID').format(cisco_id_client=cisco_id_client)
            #     cisco_client_response = requests.get(URL_CISCO_ID, verify=False).json()
            #     cisco_client_data = cisco_client_response['queryResponse']['entity'][0]['clientsDTO']
            #     cisco_client_port = cisco_client_data['clientInterface']
            #     cisco_client_status = cisco_client_data['status']
                
            #     cisco_device_name = cisco_client_data['deviceName']
            #     cisco_device_ip_adrress = cisco_client_data['deviceIpAddress']['address']

            #     prtg_device_ip_url = os.getenv('URL_PRTG_IP').format(ip=cisco_device_ip_adrress)
            #     prtg_device_ip_response = requests.get(prtg_device_ip_url, verify=False).json()
                
            #     if prtg_device_ip_response['treesize'] == 0:
            #         prtg_device_status = 'Not Found'
                
            #     else:
            #         prtg_device_id = prtg_device_ip_response['devices'][0]['objid']
            #         prtg_device_id_url = os.getenv('URL_PRTG_ID').format(id_device=prtg_device_id)
            #         prtg_device_status_response = requests.get(prtg_device_id_url, verify=False).json()
            #         prtg_device_status = prtg_device_status_response['sensors'][0]['status']
                
            #     cisco_device_ip_url = os.getenv('URL_CISCO_IP_DEVICE').format(ip=cisco_device_ip_adrress)
            #     cisco_device_ip_response = requests.get(cisco_device_ip_url, verify=False).json()
            #     if cisco_device_ip_response['queryResponse']['@count'] == 0:
            #         cisco_device_reachability = 'Not Found'
            #     else:
            #         cisco_device_id = cisco_device_ip_response['queryResponse']['entityId'][0]['$']
            #         cisco_device_id_url = os.getenv('URL_CISCO_ID_DEVICE').format(id_device=cisco_device_id)
            #         cisco_device_id_response = requests.get(cisco_device_id_url, verify=False).json()
            #         cisco_device_reachability = cisco_device_id_response['queryResponse']['entity'][0]['devicesDTO']['reachability']

            # group_low = group.lower()
            # query = (f"INSERT INTO dcs.{group_low} (name, `group`, description, ip, prtg_status, lastup_prtg, lastdown_prtg, device_ip_cisco, device_cisco, port_cisco, status_cisco, reachability_cisco, id_prtg, importancia, clave, status_device_cisco)"
            #     f"VALUES ('{name}', '{group}', '{description}', '{ip}', '{prtg_status}', '{prtg_lastup}', '{prtg_lastdown}', '{cisco_device_ip_adrress}', '{cisco_device_name}', '{cisco_client_port}', '{cisco_client_status}', '{cisco_device_reachability}', '{id_device_prtg}', '{importancia}', '{clave}', '{prtg_device_status}')")
            # cursor.execute(query)
            # mydb.commit()
                
        # Bloque para guardar el datetime de la ultima consulta en la tabla 'fechas_consultas_clientes'.         
        # now = datetime.datetime.now()
        # fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        # fecha_y_hora = str(fecha_y_hora)
        # cursor.execute(f"INSERT INTO dcs.fechas_consultas_clientes (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'OK')")
        # mydb.commit()
        
        # with open("/app/logs.txt", "a") as archivo:
        #     archivo.write(str(fecha_y_hora) + '\n')
                
        print('Terminado')       
        # cursor.close()
                
    except Exception:
        print(traceback.format_exc())
        # now = datetime.datetime.now()
        # fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        # fecha_y_hora = str(fecha_y_hora)
        # cursor.execute(f"INSERT INTO dcs.fechas_consultas_clientes (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'ERROR')")
        # mydb.commit()
        # cursor.close()
        
        # with open("/app/logs.txt", "a") as archivo:
        #     archivo.write('Fecha y hora del error: ' + str(fecha_y_hora) + ' Dispositivo del error ---> ' + ip_device + '\n')
        #     archivo.write(traceback.format_exc())
        #     archivo.write("\n")
                
                
# def bucle(scheduler):
#     clients()
#     scheduler.enter(300, 1, bucle, (scheduler,))

# if __name__ == '__main__':
#     s = sched.scheduler(time.time, time.sleep)
#     s.enter(0, 1, bucle, (s,))
#     s.run()

get_devices_data()