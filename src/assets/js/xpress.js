function xpressPay(email,amnt,firstName,lastName,mobile,tranRef) {
    
    var currentUrl = window.location.href
    if (email === "") {
        alert("email cannot be empty");
        return;
    }
    const hashbody2 = {
        "transactionId": tranRef,
        "amount": amnt,
        "currency": "NGN",
        "country": "NG",
        "email": email,
        "phoneNumber": mobile,
        "firstName": firstName,
        "lastName": lastName,
        "callbackUrl": currentUrl
    };
    let hashedPayload = '';
    const keys = Object.keys(hashbody2).sort();
    // tslint:disable-next-line:forin
    for (const index in keys) {
        let key = '';
        key = keys[index];
        hashedPayload += hashbody2[key];
    }
    //my key below
    // const hashString = "XPPUBK-01445c39c4095df9b08f566a82586d7c-X" + hashedPayload; // LIVE
    const hashString = "XPPUBK-57f22bfb5ef594e90278be1abffb5ed2-X" + hashedPayload; // TEST
    // console.log(hashString);
    const hash = sha256.create();
    // console.log(hash);
    hash.update(hashString);
    const finanlHash = hash.hex();
    // console.log(finanlHash);
    const body = {
        // "publicKey": "XPPUBK-01445c39c4095df9b08f566a82586d7c-X", // LIVE
        "publicKey": "XPPUBK-57f22bfb5ef594e90278be1abffb5ed2-X", // TEST
        "transactionId": tranRef,
        "amount": amnt,
        "currency": "NGN",
        "country": "NG",
        "email": email,
        "phoneNumber": mobile,
        "firstName": firstName,
        "lastName": lastName,
        "hash": finanlHash,
        "logoURL": "https://api.elasticemail.com/userfile/5d028e25-bd86-4559-b7c2-31e5870bbbf9/accessnew.jpg",
        "callbackUrl": currentUrl
    };
    // console.log(body);
    xpressPayonlineSetup(body);
}