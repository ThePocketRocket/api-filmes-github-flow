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
    
    # Provedor Virtualbox
    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = "1024" # 1024 MB de memória principal
    end
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

    # Sincronizar a pasta da aplicação (.) com vagrant_data dentro da VM2
    vm2.vm.synced_folder ".", "/home/vagrant/vagrant_data"

    # Provisionamento: Instalar as dependências necessárias (Node.js e npm install)
    vm2.vm.provision "shell", inline: <<-SHELL
      echo "Atualizando pacotes..."
      apt-get update

      echo "Instalando Node.js..."
      curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
      apt-get install -y nodejs

      echo "Instalando dependências do projeto..."
      cd /home/vagrant/vagrant_data
      npm install
    SHELL
  end
end
