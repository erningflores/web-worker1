function isPrime(num){
    if(num <= 1){
        return false;
    }

    for(let i=2; i <= Math.sqrt(num); i++){
        if(num % i === 0){
            return false;
        }
    }
    return true;
}

self.onmessage = event => {
    const {command, limit} = event.data;

    if(command === 'startCalculation'){
        const primes = [];
        const totalNumber = limit;

        for(let i=2; i <= limit; i++){
            if(isPrime(i)){
                primes.push(i);
            }

            if(i % 5000 === 0 || i === limit){
                const progress = Math.round((i / totalNumber) * 100);

                self.postMessage({type: 'progress', progress: progress});
            }
        }

        self.postMessage({type: 'calculationComplete', primes: primes});
    }
};

self.onerror = (error) => {
    console.error('Error inside worker:', error);
};

//console.log("Worker script loaded successfully!");