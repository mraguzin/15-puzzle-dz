class LR { // Left-right array data structure; see "Algorithms for random permutations", Appendix B by Arndt for details
    constructor(n) {
        this.fl = new Array(n);
        this.tg = new Array(n);
        this.n  = n;
        this.f  = n;

        this.tg.fill(true, 0, n);

        this.initRec(0, n - 1);
        this.fl[n - 1] = 1;
    }

    initRec(i0, i1) {
        if ((i1 - i0) !== 0) {
            const t = (i0 + i1) >> 1;
            this.initRec(i0, t);
            this.initRec(t + 1, i1);
        }

        this.fl[i1] = i1 - i0 + 1;
    }

    getFreeIdxChg(k) {
        if (k >= this.f) {
            return -1;
        }

        this.f--;
        let i0 = 0;
        let i1 = this.n - 1;
        while (1) {
            let t = (i0 + i1) >> 1;

            if ((this.fl[t] === k + 1) && this.tg[t]) {
                this.fl[t]--;
                this.tg[t] = false;
                return t;
            }

            if (this.fl[t] > k) {
                this.fl[t]--;
                i1 = t;
            } else {
                i0 = t + 1;
                k -= this.fl[t];
            }
        }
    }
}

function ffact2perm(ff, n, x) {
    let lr = new LR(n);
    for (let k = 0; k < n - 1; k++) {
        x[k] = lr.getFreeIdxChg(ff[k]);
    }

    x[n - 1] = lr.getFreeIdxChg(0);
}

function ffact2permALT(ff, n, x) {
    for (let k = 0; k < n; k++) {
        x[k] = k;
    }

    for (let k = 0; k < n - 1; k++) {
        const s = ff[k];
        if (s !== 0) {
            let last = x[k + s];

            for (let i = k + s; i > k; i--) {
                x[i] = x[i - 1];
            }

            x[k] = last;
        }
    }
}

function oldshuffle(array) {
    //Durstenfeld's shuffle algorithm (Algorithm 235: Random permutation)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i + 1);
        const tmp = array[j];
        array[j] = array[i];
        array[i] = tmp;
    }
}

function randomEvenPermutation(n) {
    // Algorithm 7.4 due to Arndt for generating random even permutations
    let a = new Array(n);
    let ff = new Array(n - 1);
    ff[0] = n;
    let i = 0;

    for (let rx = n; rx > 1; rx--, i++) {
        ff[i] = Math.floor(Math.random() * rx);
    }

    // ff.map((val, idx, dst) => dst[idx] = Math.floor(Math.random() * (n - idx)));

    i = ff.reduce((acc, cur) => acc + cur, 0);

    const mi = i % 2;
    if (mi !== 0) {
        const ps = n - 2;
        let d = ff[ps];
        d -= mi;
        if (d < 0) {
            d += 2;
        }

        if (d >= 2) {
            d -= 2;
        }

        ff[ps] = d;
    }

    ffact2perm(ff, n, a);
    return a;
}