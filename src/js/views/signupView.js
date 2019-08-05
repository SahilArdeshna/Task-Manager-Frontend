import * as signupAccount from '../models/Signup';

export const signupUser = () => {
    const html = `
        <div class="signup-section">
            <div class="form-signup">
                <form>
                    <label>Username</label>
                    <input class="signup__name" type="text" name="name" placeholder="Username" required>
                    <label>Email</label>
                    <input class="signup__email" type="text" name="email" placeholder="Email" required>
                    <label>Password</label>
                    <input class="signup__password" type="password" name="password" placeholder="Password" required> 
                    <button class="signup" type="submit">SignUp</button>
                </form>
            </div>
        </div>
    `;

    document.querySelector('.main-section').insertAdjacentHTML('afterbegin', html);

    const signup = document.querySelector('.signup');

    signup.addEventListener('click', (e) => {
        e.preventDefault();
        signupAccount.userSignup();
    });
};