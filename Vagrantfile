Vagrant.configure("2") do |config|
  # Utilizando a imagem do Ubuntu 20.04 (Focal) como base para as VMs
  config.vm.box = "ubuntu/focal64"
  
  # Aumentando o tempo de espera do boot para 10 minutos (600 segundos)
  config.vm.boot_timeout = 600

  # ==========================================
  # VM1
  # ==========================================
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1"
    
    # Definindo um endereço IPv4 privado (Classe C)
    vm1.vm.network "private_network", ip: "192.168.56.10"
    
    # Sincroniza a pasta atual ajustando as permissões para o Ansible não barrar os arquivos
    vm1.vm.synced_folder ".", "/vagrant", mount_options: ["dmode=755", "fmode=644"]
    
    # Provedor Virtualbox
    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = "1024" # 1024 MB de memória principal
    end

    # Provisionamento: Instalar Ansible no Nó de Controle
    vm1.vm.provision "shell", inline: <<-SHELL
      echo "Instalando o Ansible e sshpass no Nó de Controle (VM1)..."
      apt-get update
      apt-get install -y ansible sshpass
    SHELL
  end

  # ==========================================
  # VM2 (Backend)
  # ==========================================
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2"
    
    # Definindo um endereço IPv4 privado (Classe C)
    vm2.vm.network "private_network", ip: "192.168.56.20"
    
    # Provedor Virtualbox
    vm2.vm.provider "virtualbox" do |vb|
      # Memória suficiente para rodar Node.js
      vb.memory = "1024" 
    end
    
    # Habilitar autenticação por senha para o Ansible conseguir acessar usando usuário/senha
    # (O Ubuntu 20.04 usa o cloud-init que joga um arquivo na pasta sshd_config.d/ bloqueando senhas)
    vm2.vm.provision "shell", inline: <<-SHELL
      sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
      sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/g' /etc/ssh/sshd_config
      if ls /etc/ssh/sshd_config.d/*.conf 1> /dev/null 2>&1; then
        sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config.d/*.conf
      fi
      systemctl restart ssh
    SHELL
  end
end
