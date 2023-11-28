#include <bits/stdc++.h>
using namespace std;

const int K = 26;

int p[(int)2e6 + 2] = {0};
int dp[(int)2e6 + 2];

struct Vertex
{
    int next[K];
    bool output = false;
    int p = -1;
    char pch;
    int link = -1;
    bool done = false;

    int go[K];
    vector<int> pi;

    Vertex(int p = -1, char ch = '$') : p(p), pch(ch)
    {
        fill(begin(next), end(next), -1);
        fill(begin(go), end(go), -1);
        pi = {};
    }
};

vector<Vertex> t(1);
vector<int> bfs;

void add_string(string const &s, int q)
{
    int v = 0;
    for (char ch : s)
    {
        int c = ch - 'a';
        if (t[v].next[c] == -1)
        {
            t[v].next[c] = t.size();
            t.emplace_back(v, ch);
        }
        v = t[v].next[c];
    }
    t[v].output = true;
    t[v].pi.push_back(q);
}

int go(int v, char ch);

int get_link(int v)
{
    if (t[v].link == -1)
    {
        if (v == 0 || t[v].p == 0)
            t[v].link = 0;
        else
            t[v].link = go(get_link(t[v].p), t[v].pch);
    }

    return t[v].link;
}
int go(int v, char ch)
{
    int c = ch - 'a';
    if (t[v].go[c] == -1)
    {
        if (t[v].next[c] != -1)
            t[v].go[c] = t[v].next[c];
        else
            t[v].go[c] = v == 0 ? 0 : go(get_link(v), ch);

        int ans = t[v].go[c];
        t[ans].done = true;
        // cout << ans;
        if (t[ans].output)
        {
            if (dp[ans] == 0)
            {
                for (auto i : t[ans].pi)
                    p[i] = 1;
                dp[ans] = 1;
            }
        }
    }
    return t[v].go[c];
}

void bfsTraversal()
{
    int v = 0;
    queue<int> qu;

    for (int i = 0; i < 26; i++)
    {
        if (t[v].next[i] != -1)
        {
            qu.push(t[v].next[i]);
        }
    }

    while (qu.size() > 0)
    {
        int curState = qu.front();
        bfs.push_back(curState);
        qu.pop();

        for (int i = 0; i < 26; i++)
        {
            if (t[curState].next[i] != -1)
            {
                int cchild = t[curState].next[i];
                qu.push(cchild);
            }
        }
    }
}

int main()
{
    string s;
    cin >> s;
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        string s1;
        cin >> s1;
        add_string(s1, i);
    }
    int v = 0;
    // cout << n;

    for (int i = 0; i < s.size(); i++)
    {
        v = go(v, s[i]);
    }
    bfsTraversal();
    int bfs_size = bfs.size();
    for (int i = bfs_size - 1; i >= 0; i--)
    {
        int v = bfs[i];
        if (t[v].done)
        {
            int q = get_link(v);
            t[q].done = true;
            if (t[q].output)
            {
                if (dp[q] == 0)
                {
                    for (auto i : t[q].pi)
                        p[i] = 1;
                    dp[q] = 1;
                }
            }
        }
    }
    for (int i = 0; i < n; i++)
    {
        if (p[i])
            cout << "YES\n";
        else
            cout << "NO\n";
    }
}