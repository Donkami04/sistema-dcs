from netmiko import ConnectHandler
import os, logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try: 
    USER = os.getenv('NETMIKO_USER')
    PASSWORD = os.getenv('NETMIKO_PASSWORD')
    network_device_list = {
        "host": '10.224.113.161',
        "username": 'roadmin',
        "password": 'C4nd3*2023',
        "device_type": "fortinet",
        "port": 2221,
        "timeout": 180,
    }

    net_connect = ConnectHandler(**network_device_list)
    commands = [
        ["config vdom"],
        ["edit root"],
        ["diagnose sys sdwan health-check Check_Internet"]
    ]
    
    # Enviar los comandos en una sola consulta y obtener la salida
    output = net_connect.send_multiline(commands)
    
    # Registrar la salida de los comandos
    logging.info(output)
    net_connect.disconnect()
    
except Exception as e:
    logging.error(e)
    if net_connect:
        net_connect.disconnect()