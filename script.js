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



    function animate() {


    }
})