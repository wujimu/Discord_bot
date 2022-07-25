
#include<vector>
#include<iostream>

using namespace std;

//to multiply two given matrix
vector<vector<float> > multiply(vector<vector<float> > A, vector<vector<float> > B, int N) {
   vector<vector<float> > C(N, vector<float>(N, 0));
   
   
   for (int i = 0; i < N; ++i)
      for (int j = 0; j < N; ++j)
         for (int k = 0; k < N; ++k)
            C[i][j] += A[i][k] * B[k][j];
   return C;
}
//to calculate power of matrix
vector<vector<float> > matrix_power(vector<vector<float> > M, int p, int n) {
   vector<vector<float> > A(n, vector<float>(n, 0));
   for (int i = 0; i < n; ++i)
      A[i][i] = 1;
   while (p) {
      if (p % 2)
         A = multiply(A, M, n);
      M = multiply(M, M, n);
      p /= 2;
   }
   return A;
}
//to calculate probability of reaching from initial to final
float calc_prob(vector<vector<float> > M, int N, int F, int S, int T) {
   vector<vector<float> > matrix_t = matrix_power(M, T, N);
   return matrix_t[F - 1][S - 1];
}
int main() {
   vector<vector<float> > G{
      { 0, 0.08, 0, 0, 0, 0 },
      { 0.33, 0, 0, 0, 0, 0.62 },
      { 0, 0.06, 0, 0, 0, 0 },
      { 0.77, 0, 0.63, 0, 0, 0 },
      { 0, 0, 0, 0.65, 0, 0.38 },
      { 0, 0.85, 0.37, 0.35, 1.0, 0 }
   };
   //number of available states
   int N = 6;
   int S = 4, F = 2, T = 100;
   cout << "Probability of reaching: " << F << " in time " << T << " after starting from: " << S << " is " << calc_prob(G, N, F, S, T);
   return 0;
}