// export interface Iproduct{
//     id:string;
//     name:string;
//     rate:number;
//     totalRate: number;
//     price: number;
//     discountpercent?: number;
//     image: string
// }

export interface Iproduct {
  id: string;
  name: string;
  model?: string;
  rate: number;
  totalRate: number;
  reviews?: number;
  price: number;
  originalPrice?: number;
  discountpercent?: number;
  image: string;
  images?: string[];        // ← დაამატე ეს
  description?: string;     // ← დაამატე ეს
  features?: string[];      // ← დაამატე ეს
  stock?: number;           // ← დაამატე ეს
}