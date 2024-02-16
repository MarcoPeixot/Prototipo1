// Define a cena principal usando a classe Phaser.Scene
class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScene'
        });
    }

    // Pré-carrega os recursos antes do início do jogo
    preload() {
        // Carrega as imagens e spritesheets necessárias
        this.load.image('mapa', 'assets/map1.png');  // Imagem de fundo para a cena principal
        this.load.image('map2', 'assets/map2.png');   // Imagem de fundo para a cena2
        this.load.image('hidrante', 'assets/hydrant 32x32.png');  // Imagem de um hidrante
        this.load.spritesheet('tyler', 'assets/Persona-principal.png', { frameWidth: 32, frameHeigth: 32 });  // Spritesheet para o personagem principal
    }

    // Cria objetos do jogo e configura animações
    create() {
        // Adiciona a imagem de fundo para a cena principal
        this.add.image(400, 300, 'mapa');

        // Cria e configura o personagem do jogador (tyler)
        this.tyler = this.physics.add.sprite(100, 200, 'tyler').setScale(3);  // Cria o sprite e ajusta a escala
        this.tyler.body.setCollideWorldBounds(true);  // Permite a colisão com os limites do mundo

        // Configura entrada do teclado para movimentação do jogador
        this.cursor = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        // Configura animações para o personagem do jogador
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('tyler', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // Configurações semelhantes para animações 'subir' e 'descer'
        this.anims.create({
            key: 'subir',
            frames: this.anims.generateFrameNumbers('tyler', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'descer',
            frames: this.anims.generateFrameNumbers('tyler', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Inicia a animação 'andar' por padrão
        this.tyler.anims.play('andar', true);
    }

    // Função de atualização chamada a cada frame
    update() {
        // Verifica se o personagem do jogador atingiu uma posição específica para alternar para a cena2
        if (this.tyler.x >= 600 && this.tyler.y === 100) {
            this.scene.start('cena2');
        }

        // Manipula a movimentação do jogador com base na entrada do teclado
        if (this.cursor.left.isDown) {
            this.tyler.setFlip(true, false);  // Inverte a orientação do sprite (espelha)
            this.tyler.anims.play('andar', true);
            this.tyler.x -= 4;
        } else if (this.cursor.right.isDown) {
            this.tyler.setFlip(false, false);  // Restaura a orientação original do sprite
            this.tyler.anims.play('andar', true);
            this.tyler.x += 4;
        } else if (this.cursor.up.isDown) {
            this.tyler.anims.play('subir', true);
            this.tyler.y -= 4;
        } else if (this.cursor.down.isDown) {
            this.tyler.anims.play('descer', true);
            this.tyler.y += 4;
        } else {
            this.tyler.anims.stop('andar', true);
        }
    }
}

// Define a segunda cena
class Cena2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena2'
        });
    }

    // Pré-carrega os recursos para a segunda cena
    preload() {
        this.load.image('npc', 'assets/NPC.png');  // Imagem para o NPC (vanessa)
        // Carrega a spritesheet novamente para o tyler (se necessário)
        this.load.spritesheet('tyler', 'assets/Persona-principal.png', { frameWidth: 32, frameHeigth: 32 });
    }

    // Cria objetos do jogo e configura animações para a segunda cena
    create() {
        this.add.image(400, 300, 'map2');  // Adiciona a imagem de fundo para a cena2

        this.vanessa = this.physics.add.image(350, 550, 'npc').setScale(3);  // Cria o NPC (vanessa)
        this.physics.world.enable(this.vanessa);  // Habilita física para o NPC
        this.vanessa.body.setCollideWorldBounds(true);  // Permite a colisão com os limites do mundo

        this.tyler = this.physics.add.sprite(700, 700, 'tyler').setScale(3);  // Cria o sprite do tyler novamente (se necessário)
        this.tyler.body.collideWorldBounds = true;  // Permite a colisão com os limites do mundo

        // Configura entrada do teclado para movimentação do jogador na segunda cena
        this.cursor = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        // Configura animações para o personagem do jogador novamente (se necessário)
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('tyler', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // ... Configurações semelhantes para animações 'subir' e 'descer'
        this.anims.create({
            key: 'subir',
            frames: this.anims.generateFrameNumbers('tyler', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'descer',
            frames: this.anims.generateFrameNumbers('tyler', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Inicia a animação 'andar' por padrão
        this.tyler.anims.play('andar', true);
    }

    // Função de atualização chamada a cada frame
    update() {
        if (this.physics.overlap(this.tyler, this.vanessa)) {
            // Ação a ser realizada quando há sobreposição (colisão) entre tyler e vanessa
            alert('Olá, seja bem vindo à META');
            alert('Está preparado para seu treinamento?');
            alert('Então vamos começar!');
            this.scene.start('mainScene');
        }

        // Manipula a movimentação do jogador na segunda cena
        if (this.cursor.left.isDown) {
            this.tyler.setFlip(true, false);
            this.tyler.anims.play('andar', true);
            this.tyler.x -= 3;
        } else if (this.cursor.right.isDown) {
            this.tyler.setFlip(false, false);
            this.tyler.anims.play('andar', true);
            this.tyler.x += 3;
        } else if (this.cursor.up.isDown) {
            this.tyler.anims.play('subir', true);
            this.tyler.y -= 3;
        } else if (this.cursor.down.isDown) {
            this.tyler.anims.play('descer', true);
            this.tyler.y += 3;
        } else {
            this.tyler.anims.stop('andar', true);
        }
    }
}

// Configurações do jogo
var config = {
    pixelArt: true,
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    scene: [MainScene, Cena2],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },  // Desativa a gravidade no eixo Y (top-down)
            debug: true  // Configuração para depuração da física (opcional)
        }
    }
};

// Cria a instância do jogo
var game = new Phaser.Game(config);
