import paramiko
import time
import re

# Parámetros de conexión
host = '10.224.113.161'
port = 2221
username = 'roadmin'
password = 'C4nd3*2023'

def vdom():

    # Crear una instancia SSHClient de Paramiko
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    # Conectar al dispositivo
    client.connect(hostname=host, port=port, username=username, password=password)

    # Abrir un canal SSH
    channel = client.invoke_shell()

    # Enviar el comando 'config vdom'
    channel.send("config vdom\n")
    time.sleep(1)  # Esperar para que el comando se procese

    # Enviar otros comandos dentro del contexto 'config vdom'
    commands = [
        "edit root\n",
        "diagnose sys sdwan health-check Check_Internet\n",
        "exit\n"  # Salir del contexto 'config vdom'
    ]

    for command in commands:
        channel.send(command)
        time.sleep(1)  # Esperar para que el comando se procese

    # Recopilar la salida
    output = ""
    while channel.recv_ready():
        output += channel.recv(1024).decode('utf-8')

    # Cerrar el canal y la conexión
    channel.close()
    client.close()

    # Analizar la salida con regex
    if 'Health Check' in output:
        pattern = r'Seq\((\d+)\s+([^\s:)]+)\): state\(([^)]+)\), packet-loss\(([^)]+)\) latency\(([^)]+)\), jitter\(([^)]+)\)'
        matches = re.findall(pattern, output)
        for match in matches:
            try:
                canal = match[1]
                state = match[2]
                packet_loss = match[3]
                packet_loss = packet_loss.replace("%", "")
                latency = match[4]
                jitter = match[5]
                
                # Hacer algo con los valores obtenidos, por ejemplo, imprimirlos
                print(f"Canal: {canal}, State: {state}, Packet Loss: {packet_loss}%, Latency: {latency}, Jitter: {jitter}")
            except IndexError:
                pass  # Si no se encuentra un valor en el match, ignorarlo
