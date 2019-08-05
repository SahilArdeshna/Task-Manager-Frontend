import * as login from '../models/Login';
import * as signupView from './signupView';

// INDEX.HTML PAGE
export const loginPage = () => {
    const html = `
        <div class="section">
            <div class="form-section">
                <form class="form">
                    <label>Email</label>
                    <input class="add__email" type="text" name="email" placeholder="Email">
                    <label>Password</label>
                    <input class="add__password" type="password" name="password" placeholder="Password">
                    <button class="form__btn" type="submit">Login</button>
                    <p class="error-message">Email/Password doesn't matched!</p>
                </form>

                <div class="signup">
                    <form>
                        <label>Create Account</label>
                        <button class="signup__btn" type="submit">SignUp</button>
                    </form> 
                </div>                
            </div>              
        </div> 
    `;

    const mainSection = document.querySelector('.main-section');
    
    if (mainSection) {
        mainSection.insertAdjacentHTML('afterbegin', html);
        document.querySelector('.error-message').style.display = 'none';
    }

    const formButton = document.querySelector('.form__btn');

    formButton.addEventListener('click', (e) => {
        e.preventDefault();
        login.submitForm();            
    });    

    const signupBtn = document.querySelector('.signup__btn');
    
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mainSection.innerHTML = '';
        signupView.signupUser();
    });    
};