print = (something) => {
    console.log(something);
}
class Perceptron {

    constructor(){
        this.weigths = [1,0,0];
        this.inputs = [ 
                        [1,0,0], 
                        [1,1,0], 
                        [1,0,1],
                        [1,1,1] 
                    ];
        this.desired = [0,0,0,1];
        this.learningRate = 1;
        this.epochs = 100;
    }

    weightSum(input){
        let sum = 0;
        for(let j = 0; j < this.weigths.length; j++){
            sum+= input[j] * this.weigths[j];
        }
        return sum;
    }

    doActivation(z){
        return z >= 0 ? 1 : 0; 
    }

    calculateError(currentResult, desiredResult){
        return desiredResult - currentResult;
    }

    tweakWeights(inputIndex, error){
        let currentInput = this.inputs[inputIndex];
        for(let k = 0; k < this.weigths.length; k++){
            this.weigths[k] += this.learningRate * error * currentInput[k];
        }
    }

    train(){
        for(let i = 0; i < this.epochs; i++){
            for(let j = 0; j < this.inputs.length; j++){
                let z = this.weightSum(this.inputs[j]);
                let y = this.doActivation(z);
                let error = this.calculateError(y, this.desired[j]);
                console.log("Input index: " + j);
                console.log("Error: " + error);
                console.log("Weights before: " + this.weigths);
                this.tweakWeights(j, error);
                console.log("Weights after: " + this.weigths + "\n" + "------------------------------------");
            }
        }
    }

    insertBiasX(input){
        let vector = [];
        vector.push(1);
        for(let i = 0; i < input.length; i++){
            vector.push(input[i]);
        }
        return vector;
    }

    predict(input){
        let vec =  this.insertBiasX(input);
        let z = this.weightSum(vec);
        let y = this.doActivation(z);
        console.log("Input: [ " + input + " ] Result: " + y);
    }
}

var perceptron = new Perceptron();
perceptron.train();
perceptron.predict([0,0])