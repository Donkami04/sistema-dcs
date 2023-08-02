import warnings, requests, os, time, traceback, datetime, sched, re, logging
import mysql.connector
from dotenv import load_dotenv
from config import database

# Esto evita que las respuestas de las API tengan warnings.
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

logging.basicConfig(level=logging.INFO, format='%(levelname)s - %(message)s')
file_handler = logging.FileHandler('issues.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logging.getLogger().addHandler(file_handler)

def clients():
    load_dotenv()
    env = os.getenv('ENVIRONMENT')
    
    if env == 'local':
        mydb = mysql.connector.connect(
        host=database['local']['DB_HOST'],
        user=database['local']['DB_USER'],
        password=database['local']['DB_PASSWORD'],
        database=database['local']['DB_DATABASE']
        )
        
    if env == 'production':
        mydb = mysql.connector.connect(
        host=database['production']['DB_HOST'],
        user=database['production']['DB_USER'],
        password=database['production']['DB_PASSWORD'],
        database=database['production']['DB_DATABASE']
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
            logging.info(ip)
            name = element['name']
            description = element['description']
            clave = element['clave']
            importancia = element['importancia']
            id_device_prtg = element['id_prtg']
            cisco_id_client = element['id_cisco']
            
            if id_device_prtg == 'Not Found':
                status_prtg = 'Not Found'
                last_up_prtg = 'Not Found'
                last_down_prtg = 'Not Found'
            else:
                URL_PRTG_ID = os.getenv('URL_PRTG_ID').format(id_device=id_device_prtg)

                try:
                    prtg_data = requests.get(URL_PRTG_ID, verify=False).json()
                    sensor = prtg_data['sensors'][0]
                    status_prtg = sensor['status']
                    last_up_prtg = sensor['lastup']
                    last_down_prtg = sensor['lastdown']
                    patron = re.compile(r'<.*?>') # Se usa para formatear el last_up y last_down
                    last_up_prtg =  re.sub(patron, '', last_up_prtg)
                    last_down_prtg =  re.sub(patron, '', last_down_prtg)
                except:
                    status_prtg = 'Not Found'
                    last_up_prtg = 'Not Found'
                    last_down_prtg = 'Not Found'

            if cisco_id_client == 'Not Found':
                try:
                    group_low = group.lower()
                    query = f"SELECT * FROM dcs.{group_low} WHERE ip = '{ip}' AND device_cisco <> 'Not Found' ORDER BY id DESC LIMIT 1"
                    cursor.execute(query)
                    results = cursor.fetchall()
                    data_backup = [dict(zip(cursor.column_names, row)) for row in results]
                    data_backup = data_backup[0]
                    
                    cisco_client_port = data_backup['port_cisco']
                    cisco_client_status = data_backup['status_cisco']
                    cisco_device_name = data_backup['device_cisco']
                    cisco_device_ip_adrress = data_backup['device_ip_cisco']
                    cisco_device_reachability = data_backup['reachability_cisco']
                    prtg_device_status = data_backup['status_device_cisco']
                    is_databackup = 'true'
                    
                except:
                    cisco_client_port = 'Not Found'
                    cisco_client_status = 'Not Found'
                    cisco_device_name = 'Not Found'
                    cisco_device_ip_adrress = 'Not Found'
                    cisco_device_reachability = 'Not Found'
                    prtg_device_status = 'Not Found'
                    is_databackup = 'false'
            else:
                is_databackup = 'false'
                URL_CISCO_ID = os.getenv('URL_CISCO_ID').format(cisco_id_client=cisco_id_client)
                cisco_client_response = requests.get(URL_CISCO_ID, verify=False).json()
                cisco_client_data = cisco_client_response.get('queryResponse', {}).get('entity', [{}])[0].get('clientsDTO', {})
                cisco_client_port = cisco_client_data.get('clientInterface', 'Not Found')
                cisco_client_status = cisco_client_data.get('status', 'Not Found')
                cisco_device_name = cisco_client_data.get('deviceName', 'Not Found')
                cisco_device_ip_adrress = cisco_client_data.get('deviceIpAddress', {}).get('address', 'Not Found')

                prtg_device_ip_url = os.getenv('URL_PRTG_IP').format(ip=cisco_device_ip_adrress)
                prtg_device_ip_response = requests.get(prtg_device_ip_url, verify=False).json()
                devices_list = prtg_device_ip_response.get('devices', [])
                prtg_device_id = devices_list[0].get('objid', 'Not Found') if devices_list else 'Not Found'
                
                prtg_device_id_url = os.getenv('URL_PRTG_ID').format(id_device=prtg_device_id)
                prtg_device_status_response = requests.get(prtg_device_id_url, verify=False).json()
                prtg_device_status = prtg_device_status_response.get('sensors', [{}])[0].get('status', 'Not Found')
                
                cisco_device_ip_url = os.getenv('URL_CISCO_IP_DEVICE').format(ip=cisco_device_ip_adrress)
                cisco_device_ip_response = requests.get(cisco_device_ip_url, verify=False).json()
                count = cisco_device_ip_response.get('queryResponse', {}).get('@count', 0)

                if count == 0:
                    cisco_device_reachability = 'Not Found'
                else:
                    cisco_device_id = cisco_device_ip_response.get('queryResponse', {}).get('entityId', [{}])[0].get('$', 'Not Found')
                    cisco_device_id_url = os.getenv('URL_CISCO_ID_DEVICE').format(id_device=cisco_device_id)
                    cisco_device_id_response = requests.get(cisco_device_id_url, verify=False).json()
                    cisco_device_reachability = cisco_device_id_response.get('queryResponse', {}).get('entity', [{}])[0].get('devicesDTO', {}).get('reachability', 'Not Found')

            group_low = group.lower()
            query = (f"INSERT INTO dcs.{group_low} (name, `group`, description, ip, status_prtg, lastup_prtg, lastdown_prtg, device_ip_cisco, device_cisco, port_cisco, status_cisco, reachability_cisco, id_prtg, importancia, clave, status_device_cisco, data_backup)"
                f"VALUES ('{name}', '{group}', '{description}', '{ip}', '{status_prtg}', '{last_up_prtg}', '{last_down_prtg}', '{cisco_device_ip_adrress}', '{cisco_device_name}', '{cisco_client_port}', '{cisco_client_status}', '{cisco_device_reachability}', '{id_device_prtg}', '{importancia}', '{clave}', '{prtg_device_status}', '{is_databackup}')")
            cursor.execute(query)
            mydb.commit()
                
        # Bloque para guardar el datetime de la ultima consulta en la tabla 'fechas_consultas_clientes'.         
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        cursor.execute(f"INSERT INTO dcs.fechas_consultas_clientes (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'OK')")
        mydb.commit()
        cursor.close()
        logging.info("Terminado")
                
    except Exception:
        logging.error(traceback.format_exc())
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        cursor.execute(f"INSERT INTO dcs.fechas_consultas_clientes (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'ERROR')")
        mydb.commit()
        cursor.close()
                
                  
def bucle(scheduler):
    clients()
    scheduler.enter(300, 1, bucle, (scheduler,))

if __name__ == '__main__':
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()