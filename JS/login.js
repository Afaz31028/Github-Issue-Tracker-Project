document.getElementById('btn-signIn').addEventListener('click', ()=>{

    const userName=document.getElementById('input-username');
    const password=document.getElementById('input-password');

    const usernameLebel=document.getElementById('username-label');
    usernameLebel.innerText="Default: admin";
    usernameLebel.classList.remove('text-red-500');
    usernameLebel.classList.add('text-primary');

    const passwordLabel=document.getElementById('password-label');
    passwordLabel.innerText="Default: admin123"
    passwordLabel.classList.remove('text-red-500');
    passwordLabel.classList.add('text-primary');

    // console.log(userName,password);
    if(userName.value==='admin' && password.value==='admin123'){
        window.location.href="home.html";
    }
    else if(userName.value!=='admin' && password.value!=='admin123'){
        usernameLebel.innerText='Username does not match';
        usernameLebel.classList.remove('text-primary');
        usernameLebel.classList.add('text-red-500');
        passwordLabel.innerText="Incorrect password";
        passwordLabel.classList.remove('text-primary');
        passwordLabel.classList.add('text-red-500');
        userName.value="";
        password.value="";
        return;
    }
    else if(userName.value !=='admin'){
        usernameLebel.innerText='Username does not match';
        usernameLebel.classList.remove('text-primary');
        usernameLebel.classList.add('text-red-500');
        userName.value="";
        return;
    }
    else if(password.value !=='admin123'){
        passwordLabel.innerText="Incorrect password";
        passwordLabel.classList.remove('text-primary');
        passwordLabel.classList.add('text-red-500');
        password.value="";
        return;
    }
})