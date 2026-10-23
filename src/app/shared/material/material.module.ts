import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
imports: [
CommonModule,
MatToolbarModule,
MatButtonModule,
MatIconModule,
MatMenuModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatDividerModule,
MatTabsModule
],
exports: [
MatToolbarModule,
MatButtonModule,
MatIconModule,
MatMenuModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatDividerModule,
MatTabsModule
]
})
export class MaterialModule {}
