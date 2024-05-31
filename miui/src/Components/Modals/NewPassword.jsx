import "../../Styles/Modals/NewPassword.scss";

function NewPassword(){

return(
    <>
        <form action='' method=''>
            <label className="user-title">Створення нового паролю</label>
            <label className="n-password">Введіть новий пароль</label>
            <input type="password" name="login" placeholder="Новий пароль" className="input-register" />
            <label className="n-password">Підтвердіть новий пароль</label>
            <input type="password" name="password" placeholder=" Новий пароль ще раз" className="input-register" />
            <button className="btn-lg btn-sm button-next">Далі</button>
        </form>
    </>
    );
}
export default NewPassword;