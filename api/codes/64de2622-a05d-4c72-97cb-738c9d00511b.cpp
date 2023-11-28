#include <bits/stdc++.h>
using namespace std;

typedef long long int ll;
#define rep(i, j, n) for (int i = j; i < n; i++)
#define vi vector<ll>
#define vvi vector<vi>
#define pii pair<int, int>
#define vii vector<pii>
#define ff first
#define ss second

const ll M = 2e6 + 20;
vector<ll> fact(M, 1);
const int N = 1e5 + 7;
const int MOD = 1e9 + 7;

ll power(ll x, ll n)
{
    ll ans = 1;
    while (n != 0)
    {
        if (n % 2 == 1)
            ans = (ans * x) % MOD;
        x = (x * x) % MOD;
        n /= 2;
    }
    return ans % MOD;
}

ll nCr(ll n, ll r)
{
    if (r < 0 || r > n)
        return 0;
    ll x = power(fact[r], MOD - 2);
    ll y = power(fact[n - r], MOD - 2);
    x = (x * y) % MOD;
    return (fact[n] * x) % MOD;
}

vvi dp(1e6 + 2, vi(2, 0));

int main()
{
    // added the two lines below
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t;
    cin >> t;

    dp[1][0] = 1;
    dp[1][1] = 1;
    rep(i, 2, 1e6 + 2)
    {
        dp[i][0] = ((dp[i - 1][0] * 4) % MOD + (dp[i - 1][1]) % MOD) % MOD;
        dp[i][1] = ((dp[i - 1][0]) % MOD + (dp[i - 1][1] * 2) % MOD) % MOD;
    }

    for (int qi = 0; qi < t; qi++)
    {
        ll n;
        cin >> n;
        cout << ((dp[n][0]) % MOD + (dp[n][1]) % MOD) % MOD
             << endl;
    }
    return 0;
}