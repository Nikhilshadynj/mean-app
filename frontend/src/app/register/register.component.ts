import { Component, OnInit, Input  } from '@angular/core';
import {RegisterService} from '../services/register.service'
import { Router } from '@angular/router';
import {User} from '../auth/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() user = { name: '', email: '', password: '' }


  constructor(public RegisterService: RegisterService, public router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.RegisterService.createUser(this.user).subscribe((data: {}) => {
      this.router.navigate([' '])
    })
  }

}
