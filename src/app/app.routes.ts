import { Routes } from '@angular/router';
import { ProductsComponent } from './page/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'products'
    },
    {
        path:'products',
        component:ProductsComponent,
    },
    {
        path: 'products/:id',
        component: ProductDetailsComponent

    }
];
