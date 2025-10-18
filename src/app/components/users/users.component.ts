import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styles: []

})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isEditing: boolean = false;
  isCreating: boolean = false;
  isTeacher: boolean = false;
  currentUser: any;

newUser: any = this.getEmptyUser();


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isTeacher = this.authService.isTeacher();
    this.currentUser = this.authService.getUser();
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  viewUser(user: User): void {
    this.selectedUser = user;
    this.isEditing = false;
  }

  editUser(user: User): void {
    if (!this.isTeacher) {
      alert('Only teachers can edit users');
      return;
    }
    this.selectedUser = { ...user };
    this.isEditing = true;
  }

  deleteUser(id: number): void {
    if (!this.isTeacher) {
      alert('Only teachers can delete users');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
          this.selectedUser = null;
        },
        error: (error) => {
          alert('Error deleting user');
        }
      });
    }
  }

  saveUser(): void {
    if (!this.selectedUser) return;

    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
      next: () => {
        this.loadUsers();
        this.isEditing = false;
        this.selectedUser = null;
      },
      error: (error) => {
        alert('Error updating user');
      }
    });
  }

  createUser(): void {
    if (!this.isTeacher) {
      alert('Only teachers can create users');
      return;
    }
    this.isCreating = true;
    this.newUser = this.getEmptyUser();
  }

  saveNewUser(): void {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.isCreating = false;
        this.newUser = this.getEmptyUser();
      },
      error: (error) => {
        alert('Error creating user');
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.isCreating = false;
    this.selectedUser = null;
    this.newUser = this.getEmptyUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
  private getEmptyUser(): any {
  return {
    id: 0,
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    age: 0,
    designation: '',
    department: '',
    phoneNumber: '',
    address: '',
    imageUrl: ''
  };
}
}