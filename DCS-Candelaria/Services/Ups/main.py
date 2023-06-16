import warnings, requests, os, time, traceback, datetime, sched
import mysql.connector
from uptime import get_uptime
from dotenv import load_dotenv
from config import database

# Esto evita que las respuestas de las API tengan warnings.
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

def ups():
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
    query = "SELECT * FROM dcs.data_ups"
    cursor.execute(query)
    
    # Obtener los nombres de las columnas
    column_names = [column[0] for column in cursor.description]

    # Convertir los resultados a una lista de diccionarios
    upsList = []
    for row in cursor:
        row_dict = {}
        for i in range(len(column_names)):
            row_dict[column_names[i]] = row[i]
        upsList.append(row_dict)
    
    try:
        for ups in upsList:
            ip = ups['ip']
            url_prtg_ip = os.getenv('URL_PRTG_IP_UPS').format(ip=ip)
            prtg_response_ip = requests.get(url_prtg_ip, verify=False).json()
            if len(prtg_response_ip['devices']) == 0:
                cursor.execute(f"INSERT INTO dcs.ups (ip, name, status_prtg, batery, id_ups, uptime) VALUES ('{ip}', 'Not Found', 0, 0, 'Not Found', 0)")
                mydb.commit()
                
            else:
                prtg_response_ip = prtg_response_ip['devices'][0]
                name = prtg_response_ip['device']
                id_ups = prtg_response_ip['objid']
                print("Id del SNMP -> ", id_ups)
                
                url_prtg_id = os.getenv('URL_PRTG_ID_UPS').format(id=id_ups)
                prtg_response_id = requests.get(url_prtg_id, verify=False).json()
                sensors = prtg_response_id['sensors']
                
                get_id_ping = os.getenv('URL_PRTG_UPS_PING').format(id_snmp=id_ups)
                ping_response = requests.get(get_id_ping, verify=False).json()
                id_ping = ping_response['sensors'][0]['objid']
                print("Id del PING -> ", id_ping)
                
                uptime = get_uptime(id_ping)
                print('Este es el uptime desde main ', uptime)
                
                for sensor in sensors:
                    if 'Output Status' in sensor['sensor']:
                        status_sensor = sensor['lastvalue_raw']
                        status_sensor = int(status_sensor)
                        # switch = sensor['device']
                        # switch = switch.replace("-APC", "")
                        
                batery = 'Not Found'        
                for sensor in sensors:
                    if 'Cambio Bateria' in sensor['sensor']:
                        batery = sensor['lastvalue_raw']
                        batery = int(batery)
                        
                cursor.execute(f"INSERT INTO dcs.ups (ip, name, status_prtg, batery, id_ups, uptime) VALUES ('{ip}', '{name}', {status_sensor}, {batery}, '{id_ups}', '{uptime}')")
                mydb.commit()
                        
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        cursor.execute(f"INSERT INTO fechas_consultas_ups (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'OK')")
        mydb.commit()  
                
    except Exception:
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        cursor.execute(f"INSERT INTO fechas_consultas_ups (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'ERROR')")
        mydb.commit()
        
        with open("/app/logs.txt", "a") as archivo:
            archivo.write('Fecha y hora del error: ' + str(fecha_y_hora) + ' Dispositivo del error ---> ' + str(ip) + '\n')
            archivo.write(traceback.format_exc())
            archivo.write("\n")
            
def bucle(scheduler):
    ups()
    scheduler.enter(900, 1, bucle, (scheduler,))

if __name__ == '__main__':
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()