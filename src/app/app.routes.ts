// import { Routes } from '@angular/router';
// import { ProductsComponent } from './page/products/products.component';
// import { ProductDetailsComponent } from './pages/product-details/product-details.component';

// export const routes: Routes = [
//     {
//         path:'',
//         pathMatch:'full',
//         redirectTo:'products'
//     },
//     {
//         path:'products',
//         component:ProductsComponent,
//     },
//     {
//         path: 'products/:id',
//         component: ProductDetailsComponent

//     }
// ];


// import { Routes } from '@angular/router';
// import { ProductsComponent } from './page/products/products.component';
// import { ProductDetailComponent } from './page/product-detail/product-detail.component';

// export const routes: Routes = [
//     {
//         path: '',
//         pathMatch: 'full',
//         redirectTo: 'products'
//     },
//     {
//         path: 'products',
//         component: ProductsComponent,
//     },
//     {
//         path: 'products/:id',
//         component: ProductDetailComponent  // ჩემი ProductDetailComponent
//     }
// ];


import { Routes } from '@angular/router';
import { ProductsComponent } from './page/products/products.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { CartComponent } from './page/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products'
    },
    {
        path: 'products',
        component: ProductsComponent,
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent
    },
    {
        path: 'cart',
        component: CartComponent
    }
];