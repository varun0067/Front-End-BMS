import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ ForgotPasswordComponent ],
      providers:[DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 4 controls',() =>{
    expect(component.forgotPasswordForm.contains('username')).toBeTruthy();
    expect(component.forgotPasswordForm.contains('password')).toBeTruthy();
    expect(component.forgotPasswordForm.contains('dateOfBirth')).toBeTruthy();
    expect(component.forgotPasswordForm.contains('confirmPassword')).toBeTruthy();
  });

  it('should make the username control required',() =>{
    let control = component.forgotPasswordForm.get('username');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the password control required',() =>{
    let control = component.forgotPasswordForm.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('password control should be minimun 6 charecters',() =>{
    let control = component.forgotPasswordForm.get('password');
    control.setValue('123');
    expect(control.valid).toBeFalsy();
  });

  it('password control should be minimun 6 charecters',() =>{
    let control = component.forgotPasswordForm.get('password');
    control.setValue('123456');
    expect(control.valid).toBeTruthy();
  });

  it('should make the dateOfBirth control required',() =>{
    let control = component.forgotPasswordForm.get('dateOfBirth');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the confirmPassword control required',() =>{
    let control = component.forgotPasswordForm.get('confirmPassword');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('confirmPassword control should be minimun 6 charecters',() =>{
    let control = component.forgotPasswordForm.get('confirmPassword');
    control.setValue('123');
    expect(control.valid).toBeFalsy();
  });

  it('confirmPassword control should be minimun 6 charecters',() =>{
    let control = component.forgotPasswordForm.get('confirmPassword');
    control.setValue('123456');
    expect(control.valid).toBeTruthy();
  });
  
});
