

exports.readData = function (req, res) {
    /*
    const csv = require('csvtojson')
    const fs = require('fs')
    const csvFilePath = './hepatitis_data.csv'
    
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            let data = JSON.stringify(jsonObj, null,2)
            //let data = jsonObj
            fs.writeFile('./hep1.json', data, (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });

            console.log('This is after the write call');
            
        })
        */
};

//
exports.trainAndPredict = function (req, res) {
    const tf = require('@tensorflow/tfjs');
    require('@tensorflow/tfjs-node');
    //load iris training and testing data
    const hep = require('../../hep.json');
    const hepTesting = require('../../hep_test.json');
    console.log(hepTesting)
    //
    //

    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    console.log('trainingData')
    const trainingData = tf.tensor2d(hep.map(item => [
        item.Age,
        item.Sex,
        item.Steroid,
        item.Antivirals,
        item.Fatigue,
        item.Malaise,
        item.Anorexia,
        item.Liver_big,
        item.Liver_firm,
        item.Spleen_palpable,
        item.Spiders,
        item.Ascites,
        item.Varices,
        item.Bilurubin,
        item.Alk_phosphate,
        item.Sgot,
        item.Albumin,
        item.Protime,
        item.Histology
    ]))
    //
    //tensor of output for training data
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // Die_Live 1:       1,0
    // Die_Live 2:       0,1
    const outputData = tf.tensor2d(hep.map(item => [
        item.Die_Live === 1 ? 1 : 0,
        item.Die_Live === 2 ? 1 : 0
    ]))
    //console.log(outputData.dataSync())

    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(hepTesting.map(item => [
        item.Age,
        item.Sex,
        item.Steroid,
        item.Antivirals,
        item.Fatigue,
        item.Malaise,
        item.Anorexia,
        item.Liver_big,
        item.Liver_firm,
        item.Spleen_palpable,
        item.Spiders,
        item.Ascites,
        item.Varices,
        item.Bilurubin,
        item.Alk_phosphate,
        item.Sgot,
        item.Albumin,
        item.Protime,
        item.Histology
    ]))
    console.log(testingData.dataSync())
    testingData.array().then(array => {
        console.log(array)
    })

    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [19], // 19 input neurons (features)
        activation: "sigmoid",
        units: 30, //dimension of output space (first hidden layer)
    }))
    //add the first hidden layer
    model.add(tf.layers.dense({
        inputShape: [30], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 15, //dimension of final output (die or live)
    }))
    //add the first hidden layer
    model.add(tf.layers.dense({
        inputShape: [15], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 2, //dimension of final output (die or live)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 2, //dimension of final output
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        //categoricalCrossentropy
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.003),
        metrics: ['accuracy'],
    })
    console.log(model.summary())
    // train/fit the model for the fixed number of epochs
    const startTime = Date.now()
    //
    async function run() {
        const startTime = Date.now()
        await model.fit(trainingData, outputData,
            {
                epochs: 1000,
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }

        ) //fit
        //
        const results = model.predict(testingData);
        results.print()
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(array => {
            console.log(array)
            var resultForTest1 = array[0];
            var resultForTest2 = array[1];
            var resultForTest3 = array[2];
            var dataToSent = {row1: resultForTest1,row2: resultForTest2, row3: resultForTest3}
            
            //var resultForData1 = array[0];
            res.render('results',
                {
                    results: results,
                    resultForTest1: resultForTest1,
                    resultForTest2: resultForTest2,
                    resultForTest3: resultForTest3
                }
            )
        })
    } //end of run function
    run()
    //

};

