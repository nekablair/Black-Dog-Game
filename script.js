//after all images load, game starts

window.addEventListener('load', function() { 
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d') //2d api with drawing methods/properties
    canvas.width = 800
    canvas.height = 720

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
        }
        draw(context){
            context.fillStyle = 'white'
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this.width, this.height)//with 0,0 gives entire png, must give it coordinates for where you want the player to be in the canvas, sx,sy,sw, sh cropping out sprite
        }
        update(){
            this.x++//everytime call is made, moves player
        }
    }



    class Background {


    }



    class Enemy {


    }



    function handleEnemies() {


    }



    function displayStatusText() {


    }

    const input = new InputHandler()
    const player = new Player(canvas.width, canvas.height) //instance of player class

    function animate() {
        ctx.clearRect(0,0, canvas.width, canvas.height)//this removes the part left behind with player.draw(ctx)
        player.draw(ctx) //this creates a moving player but keeps the painted parts behind
        player.update()
        requestAnimationFrame(animate)//make endless animation loop by calling parent function
    }
    animate()
})