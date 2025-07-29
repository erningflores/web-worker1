const startWorkerButton = document.getElementById('startWorker');
const changeColorBUtton = document.getElementById('changeColor');
const resultDiv = document.getElementById('result');
const statusDiv = document.getElementById('status');
let myWorker;

startWorkerButton.addEventListener('click', () => {
    if(window.Worker){
        statusDiv.textContent = 'Worker started! Calculating Primes...';
        resultDiv.textContent = 'Please wait...';

        myWorker = new Worker('/js/worker.js');

        myWorker.onmessage = (event) => {
            if(event.data.type === 'calculateComplete'){
                const primes = event.data.primes;
                resultDiv.textContent = `Found ${primes.length} primes number. the last prime was: ${primes[primes.length - 1]}`;
                myWorker.terminate();
                myWorker = null;
            }else if(event.data.type === 'progress'){
                statusDiv.textContent = `Woker progress: ${event.data.progress}%`;
            }
        };

        myWorker.onerror = event => {
            console.error('Worker error:', event);
            statusDiv.textContent = 'An error occured in the worker.';
        };

        myWorker.postMessage({command: 'startCalculation', limit: 200000});
    }else{
        statusDiv.textContent = 'Your browser does not support web worker.';
    }
    
    /*
    myWorker = new Worker('js/worker.js');

    myWorker.addEventListener('message', event => {
        console.log("The worker reponded:", event.data);
    });

    myWorker.postMessage(10);
    myWorker.postMessage(24);
    */
});

changeColorBUtton.addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    document.body.style.backgroundColor = randomColor;
    console.log('Main thread updated background color!');
});
