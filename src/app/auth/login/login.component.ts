import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.module";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {fadeStateTrigger} from "../../shared/animations/fade.animation";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'mm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

    message: Message;
    private form: FormGroup;

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta
    ) {
        title.setTitle('Вход в систему');
        meta.addTags([
            {name: 'keywords', content: 'логин, вход, система'},
            {name: 'description' , content: 'Страница для входа в систему'}
        ]);
    }

    ngOnInit() {

        this.message = new Message('', '');
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['nowCanLogin']) {
                    this.showMessage('Теперь вы можете зайти в систему', 'success');
                } else if (params['accessDenied']) {
                    this.showMessage('Для работы с системой вам необходимо войти', 'warning');
                }
            });
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
        });
    }

    onSubmit() {
        const formData = this.form.value;

        this.usersService.getUserByEmail(formData.email)
            .subscribe((user: User) => {
                if (user) {
                    if (user.password === formData.password) {
                        this.message.text = '';
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.authService.login();
                        this.router.navigate(['/system', 'bill']);
                    } else {
                        this.showMessage("Пароль не верный");
                    }
                } else {
                    this.showMessage('Такого пользователя не существует');
                }
            });
    }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = ' ';
            this.message.type = ' ';
        }, 5000);
    }

}
