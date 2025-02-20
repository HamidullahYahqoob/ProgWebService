import { Routes } from '@angular/router';
import { StockageComponent } from './stockage/stockage.component';
import { I18nComponent } from './i18n/i18n.component';
import { TokenComponent } from './token/token.component';

export const routes: Routes = [
    {path:"", redirectTo: "/stockage", pathMatch:"full"},
    {path:"stockage", component:StockageComponent},
    {path:"i18n", component:I18nComponent},
    {path:"token", component:TokenComponent}
];
