Init Token.

    Lyrid.initToken({
      key: "34pQkHp7drouTGB2Z0ph",
      secret: "Qw2FIhoBDXoxQLEV7r670VAogA1YN0KpV5faISINxnHLRQfRPV"
    });
\
Execute the code. This will return a promise.

    const raw = JSON.stringify({"InputURL":"https://www.petmd.com/sites/default/files/adult-homeless-cat-asking-for-food-picture-id847415388.jpg"});
    const response = Lyrid.execute({
      id: "86b67bf3-2d38-4f6d-bd5b-5c48c48d8388",
      framework: "LYR",
      inputs: raw
    });

    response.then(v => {
      console.log(v);
      document.getElementById("result").innerHTML=v;
    });
    
A developer using our JS Framework should call init intelligently.    