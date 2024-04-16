//after all images load, game starts

window.addEventListener('load', function() { 
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d') //2d api with drawing methods/properties
    canvas.width = 800
    canvas.height = 720
    let enemies = []

    class InputHandler {
        constructor(){ //keep track of key presses
            this.keys = []
            //es6 arrow function don't bind this, but inherit from parent scope, called lexical scoping
            //using arrow function so it doesn't 'forget' what e stands for, grabbing the event of the key press
            window.addEventListener('keydown', e => {
                console.log(e.key)
                if(( e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight')
                    //grabbing key data and adding to list, only if it isn't already there
                && this.keys.push(e.key) === -1){
                    this.keys.push(e.key)
                }
                console.log(e.key, this.keys)
            })

            window.addEventListener('keyup', e => {
                console.log(e.key)
                if(( e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight')
                ){
                    //find and remove key pressed from array
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
                console.log(e.key, this.keys)
            })
        }

    }



    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.width = 200
            this.height = 200
            this.x = 0 //start at zero
            this.y = this.gameHeight - this.height //start at zero, then once you can see square, move to bottom of screen
            this.image = document.getElementById('playerImage')
            this.frameX = 0
            this.frameY = 0
            this.speed = 0
            this.vy = 0
            this.weight = 1 //need an opposing force or when you jump with player, it flies off the screen
        
        }
        draw(context){
            context.fillStyle = 'white'
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)//with 0,0 gives entire png, must give it coordinates for where you want the player to be in the canvas, sx,sy,sw, sh cropping out sprite
        }
        update(input){
            // this.x++//everytime call is made, moves player
            //horizontal movement
            this.x += this.speed
            if (input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5
            } else if(input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5
            } else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                this.vy -= 32 //tracking velocity of jump, constantly changing with each jump, adding the weight onto the character
            } else {
                this.speed = 0
            }

            if (this.x < 0) this.x = 0//stop player from going off screen to left
            // this.y += this.
            else if(this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width//stop player from going off screen to right

            //vertical movement
            this.y += this.vy //need a way to check if player is in air or on ground, make a helper function called onGround()
            if (!this.onGround()){
                this.vy += this.weight
                this.frameY = 1
            } else {
                this.vy = 0
                this.frameY = 0
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height //prevents player from going through the floor partially on big jumps
        }
        onGround(){
            return this.y >= this.gameHeight - this.height
        }
    }



    class Background {
        constructor(gameWidth, gameHeight){
            //convert this to class variables
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = document.getElementById('backgroundImage')
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 720
            this.speed = 7
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height) //by adding another drawImage, create single endless scene, this is an illusion, we are only filling in the gap where it ends with the next image
        }
        update(){
            this.x -= this.speed
            if (this.x < 0 - this.width) this.x = 0 //if we get to end of backgound, reset back to 0, in order to keep looping scene
        }
    }



    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.width = 160 //use the actual size of the asset
            this.height = 119
            this.image = document.getElementById("enemyImage")
            this.x = this.gameWidth
            this.y = this.gameHeight - this.height
            this.frameX = 0
            this.frameY = 0
        }
        draw(context){
            //since there is only one row on enemy png, we don't need to times the zero by this.height, so we just keep the zero
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        }
        update(){
            this.x-- //move enemy to the left
        }

    }



    function handleEnemies() {


    }



    function displayStatusText() {


    }

    //creating instances
    const input = new InputHandler()
    const player = new Player(canvas.width, canvas.height) //instance of player class
    const background = new Background(canvas.width, canvas.height)
    const enemy1 = new Enemy(canvas.width, canvas.height)



    function animate() {
        ctx.clearRect(0,0, canvas.width, canvas.height)//this removes the part left behind with player.draw(ctx)
        background.draw(ctx) //the background must come before player since it is only one canvas, so the player can lay on top of the background
        background.update()
        player.draw(ctx) //this creates a moving player but keeps the painted parts behind
        player.update(input)
        enemy1.draw(ctx)
        enemy1.update()
        
        requestAnimationFrame(animate)//make endless animation loop by calling parent function
    }
    animate()
})