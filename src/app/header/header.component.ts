
// import { Component, inject } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// import { CartService } from '../services/cart.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent {
//   cartService = inject(CartService);
//   router = inject(Router);

//   onSearch(event: Event) {
//     const searchTerm = (event.target as HTMLInputElement).value;
//     this.router.navigate(['/'], { queryParams: { search: searchTerm } });
//   }
// }

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartService = inject(CartService);
  router = inject(Router);

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.trim();
    
    if (searchTerm) {
      this.router.navigate(['/products'], { 
        queryParams: { search: searchTerm } 
      });
    } else {
      this.router.navigate(['/products']);
    }
  }
}

