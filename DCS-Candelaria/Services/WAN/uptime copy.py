import xml.etree.ElementTree as ET
import requests, warnings, os, datetime, re, calendar, mysql.connector
from dotenv import load_dotenv
from config import database

warnings.filterwarnings('ignore', message='Unverified HTTPS request')


load_dotenv()


def get_uptime():
    
    # env = os.getenv('ENVIRONMENT')
    
    # if env == 'local':
    #     mydb = mysql.connector.connect(
    #     host=database['local']['DB_HOST'],
    #     user=database['local']['DB_USER'],
    #     password=database['local']['DB_PASSWORD'],
    #     database=database['local']['DB_DATABASE']
    #     )
        
    # else:
    #     mydb = mysql.connector.connect(
    #     host=database['production']['DB_HOST'],
    #     user=database['production']['DB_USER'],
    #     password=database['production']['DB_PASSWORD'],
    #     database=database['production']['DB_DATABASE']
    #     )
        
    # cursor = mydb.cursor()

    # # Realizar una consulta para leer información de la base de datos
    # query = "SELECT * FROM dcs.data_wan"
    # cursor.execute(query)
    
    # # Obtener los nombres de las columnas
    # column_names = [column[0] for column in cursor.description]

    # # Convertir los resultados a una lista de diccionarios
    # wanList = []
    # for row in cursor:
    #     row_dict = {}
    #     for i in range(len(column_names)):
    #         row_dict[column_names[i]] = row[i]
    #     wanList.append(row_dict)
    
    wanList = ['10.230.127.1']
        
    for wan in wanList:
        # ip_wan = wan.get('ip')
        ip_wan = wan
        print(ip_wan)
        device_id_url = os.getenv('URL_PRTG_GET_ID_WITH_IP').format(ip=ip_wan)
        response_1 = requests.get(device_id_url, verify=False).json()
        device_data = response_1.get('devices', 'Not Found')
        
        if device_data == 'Not Found' or device_data == []:
            device_name = 'Not Found'
            #! Definir todas las variables a guardar como NF
        else:
            device_id = device_data[0].get('objid')
            device_name = device_data[0].get('device')
            get_id_ping_url = os.getenv('URL_PRTG_GET_ID_PING_WITH_ID').format(id_device=device_id)
            response_2 = requests.get(get_id_ping_url, verify=False).json()
            sensor_ping_id = response_2.get('sensors', [{}])[0].get('objid', 'Not Found')
            if sensor_ping_id == 'Not Found' or sensor_ping_id == []:
                sensor_ping_id = 'Not Found'
                #! Definir todas las variables a guardar como NF:
            else:
                sdate_anterior, edate_anterior, sdate_actual, edate_actual, sdate_hoy, edate_hoy = dates()
                last_uptime_days, last_downtime_days, last_uptime_percent, last_downtime_percent = get_wan_data(sensor_ping_id, sdate_anterior, edate_anterior)
                current_uptime_days, current_downtime_days, current_uptime_percent, current_downtime_percent = get_wan_data(sensor_ping_id, sdate_actual, edate_actual)
                today_uptime_days, today_downtime_days, today_uptime_percent, today_downtime_percent = get_wan_data(sensor_ping_id, sdate_hoy, edate_hoy)
                print(f"last_uptime_days: {last_uptime_days}")
                print(f"last_downtime_days: {last_downtime_days}")
                print(f"last_uptime_percent: {last_uptime_percent}")
                print(f"last_downtime_percent: {last_downtime_percent}")
                print(f"current_uptime_percent: {current_uptime_percent}")
                print(f"today_uptime_percent: {today_uptime_percent}")
            

            
        
def format_historic_data(data):
    if data == '100':
        return data
    if data == '':
        data = round(float(0), 2)
    if data != '100':
        data = round((float(data) / 1000), 2)
    return data

def get_wan_data(sensor_ping_id, sdate, edate):
    get_historicdata = os.getenv('URL_HISTORICDATA').format(id_ping=sensor_ping_id, sdate=sdate, edate=edate)
    response_3 = requests.get(get_historicdata, verify=False)
    xml_content = response_3.content
    root = ET.fromstring(xml_content)

    # Función recursiva para convertir un elemento XML en un diccionario
    def xml_to_dict(element):
        if len(element) == 0:
            return element.text
        result = {}
        for child in element:
            child_data = xml_to_dict(child)
            if child.tag in result:
                if isinstance(result[child.tag], list):
                    result[child.tag].append(child_data)
                else:
                    result[child.tag] = [result[child.tag], child_data]
            else:
                result[child.tag] = child_data
        return result
    
    # Convertir el elemento raíz en un diccionario
    xml_dict = xml_to_dict(root)
    uptime_percent = xml_dict.get('uptimepercent')
    downtime_percent = xml_dict.get('downtimepercent')
    uptime_days = xml_dict.get('uptime')
    downtime_days = xml_dict.get('downtime')
    
    uptime_days = ' '.join(uptime_days.split())
    downtime_days = ' '.join(downtime_days.split())
    downtime_percent = re.sub(r'[^\d.]', '', downtime_percent)
    uptime_percent = re.sub(r'[^\d.]', '', uptime_percent)
    
    downtime_percent = format_historic_data(downtime_percent)
    uptime_percent = format_historic_data(uptime_percent)

    return uptime_days, downtime_days, uptime_percent, downtime_percent

def dates():
    now = datetime.datetime.now()
    ano_actual = now.year
    mes_actual = now.month

    if mes_actual == 1:  # Si es enero, restamos un mes y ajustamos el año
        mes_anterior = 12
        ano_anterior = ano_actual - 1

    else:
        mes_anterior = mes_actual - 1
        ano_anterior = ano_actual
    _, num_days = calendar.monthrange(ano_actual, mes_actual)

    sdate_anterior = f"{ano_actual}-{mes_anterior:02d}-01-00-00-00"
    edate_anterior = f"{ano_actual}-{mes_anterior:02d}-{num_days}-23-59-59"

    sdate_actual = f"{ano_actual}-{mes_actual:02d}-01-00-00-00"
    edate_actual = f"{ano_actual}-{mes_actual:02d}-{num_days}-23-59-59"

    sdate_hoy = f"{ano_actual}-{mes_actual:02d}-{now.day:02d}-00-00-00"
    edate_hoy = f"{ano_actual}-{mes_actual:02d}-{now.day:02d}-23-59-59"
    
    return sdate_anterior, edate_anterior, sdate_actual, edate_actual, sdate_hoy, edate_hoy


get_uptime()