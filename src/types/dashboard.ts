// // export interface StatsResponse {
// //   status: number;
// //   message: string;
// //   data: {
// //     total_items: number;
// //     total_pages: number;
// //     current_page: number;
// //     limit: number;
// //     items: StatItem[];
// //     links: {
// //       prev: string | null;
// //       next: string | null;
// //     };
// //   };
// // }

// // export interface StatItem {
// //   id: number;
// //   name: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }
// export type Counts = {
//   totalUsers: number;
//   totalDestinations: number;
//   totalCategories: number;
// };

// export type ChartItem = {
//   name: string;
//   value: number;
// };

// export type StatsResponse = {
//   success: boolean;
//   message: string;
//   data: {
//     counts: Counts;
//     chartData: ChartItem[];
//   };
// };