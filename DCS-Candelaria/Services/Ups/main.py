import warnings, requests, os, time, traceback, datetime, sched
import mysql.connector
from dotenv import load_dotenv

# Esto evita que las respuestas de las API tengan warnings.
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

def ups():
    mydb = mysql.connector.connect(
    host="127.0.0.1", #! Cambiar a 'db' o lógica para cambiar dependiendo
    user="candelaria",
    password="candelaria",
    database="dcs"
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

    load_dotenv()
    try:
        for ups in upsList:
            ip = ups['ip']
            #Bloque de consulta API PRTG
            url_prtg_ip = os.getenv('URL_PRTG_IP_UPS').format(ip=ip)
            prtg_response_ip = requests.get(url_prtg_ip, verify=False).json()
            if len(prtg_response_ip['devices']) == 0:
                print(ip)
                cursor.execute(f"INSERT INTO dcs.ups (ip, name, status_prtg, batery, switch) VALUES ('{ip}', 'Not Found', 0, 0, 'Not Found')")
                mydb.commit()
                
            else:
                prtg_response_ip = prtg_response_ip['devices'][0]
                name = prtg_response_ip['device']
                id_ups = prtg_response_ip['objid']
                url_prtg_id = os.getenv('URL_PRTG_ID_UPS').format(id=id_ups)
                prtg_response_id = requests.get(url_prtg_id, verify=False).json()
                sensors = prtg_response_id['sensors']
                
                for sensor in sensors:
                    if 'Output Status' in sensor['sensor']:
                        status_sensor = sensor['lastvalue_raw']
                        status_sensor = int(status_sensor)
                        print(sensor)
                        switch = sensor['device']
                        switch = switch.replace("-APC", "")
                        
                batery = 'Not Found'        
                for sensor in sensors:
                    if 'Cambio Bateria' in sensor['sensor']:
                        batery = sensor['lastvalue_raw']
                        batery = int(batery)
                        
                
                        
                cursor.execute(f"INSERT INTO dcs.ups (ip, name, status_prtg, batery, switch, id_ups) VALUES ('{ip}', '{name}', {status_sensor}, {batery}, '{switch}', '{id_ups}')")
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
        
        with open("/home/donkami/Sona/Sistema-DCS/DCS-Candelaria/Services/Ups/logs.txt", "a") as archivo:
        # with open("/app/logs.txt", "a") as archivo:
            archivo.write('Fecha y hora del error: ' + str(fecha_y_hora) + ' Dispositivo del error ---> ' + str(ip) + '\n')
            archivo.write(traceback.format_exc())
            archivo.write("\n")
            
ups()
ups()
ups()