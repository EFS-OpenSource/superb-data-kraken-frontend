'use strict';
const y = 'OidcTrustedDomains.js',
  A = '*',
  _ = {
    REFRESH_TOKEN: 'REFRESH_TOKEN_SECURED_BY_OIDC_SERVICE_WORKER',
    ACCESS_TOKEN: 'ACCESS_TOKEN_SECURED_BY_OIDC_SERVICE_WORKER',
    NONCE_TOKEN: 'NONCE_SECURED_BY_OIDC_SERVICE_WORKER',
    CODE_VERIFIER: 'CODE_VERIFIER_SECURED_BY_OIDC_SERVICE_WORKER',
  },
  w = {
    access_token_or_id_token_invalid: 'access_token_or_id_token_invalid',
    access_token_invalid: 'access_token_invalid',
    id_token_invalid: 'id_token_invalid',
  },
  I = '/.well-known/openid-configuration';
function K(n, e) {
  if (!e) return;
  if (
    !n.find((o) => {
      var s;
      let t;
      return (
        typeof o == 'string' ? (t = new RegExp(`^${o}`)) : (t = o),
        (s = t.test) == null ? void 0 : s.call(t, e)
      );
    })
  )
    throw new Error(
      'Domain ' + e + ' is not trusted, please add domain in ' + y,
    );
}
const D = (n, e) =>
    Array.isArray(n) ? n : n[`${e}Domains`] ?? n.domains ?? [],
  M = (n, e, i) => {
    var o;
    if (e.endsWith(I)) return null;
    for (const [t, s] of Object.entries(n)) {
      const d = s.oidcServerConfiguration;
      if (
        !d ||
        (d.tokenEndpoint && e === d.tokenEndpoint) ||
        (d.revocationEndpoint && e === d.revocationEndpoint)
      )
        continue;
      const l = i == null ? [] : i[t],
        f = D(l, 'accessToken'),
        r = d.userInfoEndpoint ? [d.userInfoEndpoint, ...f] : [...f];
      let a = !1;
      if (r.find((h) => h === A)) a = !0;
      else
        for (let h = 0; h < r.length; h++) {
          let c = r[h];
          if (
            (typeof c == 'string' && (c = new RegExp(`^${c}`)),
            (o = c.test) != null && o.call(c, e))
          ) {
            a = !0;
            break;
          }
        }
      if (a) return s.tokens ? s : null;
    }
    return null;
  };
function U(n, e) {
  return n.split(e).length - 1;
}
function P(n) {
  return JSON.parse(W(n.split('.')[1].replace('-', '+').replace('_', '/')));
}
function W(n) {
  return decodeURIComponent(
    Array.prototype.map
      .call(
        atob(n),
        (e) => '%' + ('00' + e.charCodeAt(0).toString(16)).slice(-2),
      )
      .join(''),
  );
}
function F(n, e) {
  const i = new Date().getTime() / 1e3;
  return Math.round(e - n - i);
}
function b(n) {
  return n ? F(0, n.expiresAt) > 0 : !1;
}
const O = (n) => {
    try {
      return n && U(n, '.') === 2 ? P(n) : null;
    } catch (e) {
      console.warn(e);
    }
    return null;
  },
  q = (n, e, i) => {
    if (n.idTokenPayload) {
      const o = n.idTokenPayload;
      if (i.issuer !== o.iss)
        return { isValid: !1, reason: 'Issuer does not match' };
      const t = new Date().getTime() / 1e3;
      if (o.exp && o.exp < t) return { isValid: !1, reason: 'Token expired' };
      const s = 60 * 60 * 24 * 7;
      if (o.iat && o.iat + s < t)
        return { isValid: !1, reason: 'Token is used from too long time' };
      if (e && o.nonce && o.nonce !== e)
        return { isValid: !1, reason: 'Nonce does not match' };
    }
    return { isValid: !0, reason: '' };
  };
function L(n, e, i) {
  if (!n.issued_at) {
    const u = new Date().getTime() / 1e3;
    n.issued_at = u;
  }
  const o = O(n.access_token),
    t = { ...n, accessTokenPayload: o };
  e.hideAccessToken && (t.access_token = _.ACCESS_TOKEN + '_' + i),
    (n.accessTokenPayload = o);
  let s = null;
  if (n.id_token) {
    if (
      ((s = O(n.id_token)),
      (n.idTokenPayload = { ...s }),
      s.nonce && e.nonce != null)
    ) {
      const u = _.NONCE_TOKEN + '_' + e.configurationName;
      s.nonce = u;
    }
    t.idTokenPayload = s;
  }
  n.refresh_token && (t.refresh_token = _.REFRESH_TOKEN + '_' + i);
  const d = s && s.exp ? s.exp : Number.MAX_VALUE,
    l = o && o.exp ? o.exp : n.issued_at + n.expires_in;
  let f;
  const r = e.oidcConfiguration.token_renew_mode;
  r === w.access_token_invalid
    ? (f = l)
    : r === w.id_token_invalid
    ? (f = d)
    : (f = d < l ? d : l),
    (t.expiresAt = f),
    (n.expiresAt = f);
  const a = e.nonce ? e.nonce.nonce : null,
    { isValid: h, reason: c } = q(n, a, e.oidcServerConfiguration);
  if (!h) throw Error(`Tokens are not OpenID valid, reason: ${c}`);
  if (
    e.tokens != null &&
    'refresh_token' in e.tokens &&
    !('refresh_token' in n)
  ) {
    const u = e.tokens.refresh_token;
    e.tokens = { ...n, refresh_token: u };
  } else e.tokens = n;
  return (e.status = 'LOGGED_IN'), t;
}
function N(n) {
  const e = n.configurationName;
  return (i) =>
    i.status !== 200
      ? i
      : i.json().then((o) => {
          const t = L(o, n, e),
            s = JSON.stringify(t);
          return new Response(s, i);
        });
}
function T(n) {
  const e = {};
  for (const i of n.keys()) n.has(i) && (e[i] = n.get(i));
  return e;
}
const V = (n) => new Promise((e) => setTimeout(e, n));
function H(n, e) {
  const i = /code_verifier=[A-Za-z0-9_-]+/i;
  return n.replace(i, `code_verifier=${e}`);
}
const p = self;
p.importScripts(y);
const x = Math.round(new Date().getTime() / 1e3).toString(),
  j = 'OidcKeepAliveServiceWorker.json',
  $ = (n) => {
    console.log('[OidcServiceWorker] service worker installed ' + x),
      n.waitUntil(p.skipWaiting());
  },
  z = (n) => {
    console.log('[OidcServiceWorker] service worker activated ' + x),
      n.waitUntil(p.clients.claim());
  };
let S = null;
const g = {
    default: {
      configurationName: 'default',
      tokens: null,
      status: null,
      state: null,
      codeVerifier: null,
      nonce: null,
      oidcServerConfiguration: null,
      hideAccessToken: !0,
    },
  },
  J = (n, e) => {
    const i = [];
    for (const [, o] of Object.entries(n))
      ((o.oidcServerConfiguration != null &&
        e.startsWith(o.oidcServerConfiguration.tokenEndpoint)) ||
        (o.oidcServerConfiguration != null &&
          o.oidcServerConfiguration.revocationEndpoint &&
          e.startsWith(o.oidcServerConfiguration.revocationEndpoint))) &&
        i.push(o);
    return i;
  },
  Y = async (n) => {
    const e = n.request,
      i = e.headers.has('oidc-vanilla'),
      o = { status: 200, statusText: 'oidc-service-worker' },
      t = new Response('{}', o);
    if (!i) {
      const s = new URL(e.url),
        d = Number(s.searchParams.get('minSleepSeconds')) || 240;
      for (let l = 0; l < d; l++)
        await V(1e3 + Math.floor(Math.random() * 1e3)),
          await (
            await caches.open('oidc_dummy_cache')
          ).put(n.request, t.clone());
    }
    return t;
  },
  B = async (n) => {
    const e = n.request,
      i = e.url;
    if (e.url.includes(j)) {
      n.respondWith(Y(n));
      return;
    }
    const o = M(g, e.url, trustedDomains);
    if (o && o.tokens && o.tokens.access_token) {
      for (; o.tokens && !b(o.tokens); ) await V(200);
      const l =
        e.mode == 'navigate'
          ? new Request(e, {
              headers: {
                ...T(e.headers),
                authorization: 'Bearer ' + o.tokens.access_token,
              },
            })
          : new Request(e, {
              headers: {
                ...T(e.headers),
                authorization: 'Bearer ' + o.tokens.access_token,
              },
              mode: o.oidcConfiguration
                .service_worker_convert_all_requests_to_cors
                ? 'cors'
                : e.mode,
            });
      n.waitUntil(n.respondWith(fetch(l)));
      return;
    }
    if (n.request.method !== 'POST') return;
    let t = null;
    const s = J(g, e.url),
      d = s.length;
    if (d > 0) {
      const l = new Promise((f, r) => {
        const a = e.clone();
        a.text()
          .then((c) => {
            if (c.includes(_.REFRESH_TOKEN) || c.includes(_.ACCESS_TOKEN)) {
              let u = c;
              for (let E = 0; E < d; E++) {
                const k = s[E];
                if (k && k.tokens != null) {
                  const R = _.REFRESH_TOKEN + '_' + k.configurationName;
                  if (c.includes(R)) {
                    (u = u.replace(
                      R,
                      encodeURIComponent(k.tokens.refresh_token),
                    )),
                      (t = k);
                    break;
                  }
                  const v = _.ACCESS_TOKEN + '_' + k.configurationName;
                  if (c.includes(v)) {
                    (u = u.replace(
                      v,
                      encodeURIComponent(k.tokens.access_token),
                    )),
                      (t = k);
                    break;
                  }
                }
              }
              const C = fetch(e, {
                body: u,
                method: a.method,
                headers: { ...T(e.headers) },
                mode: a.mode,
                cache: a.cache,
                redirect: a.redirect,
                referrer: a.referrer,
                credentials: a.credentials,
                integrity: a.integrity,
              });
              return t &&
                t.oidcServerConfiguration != null &&
                t.oidcServerConfiguration.revocationEndpoint &&
                i.startsWith(t.oidcServerConfiguration.revocationEndpoint)
                ? C.then(async (E) => {
                    const k = await E.text();
                    return new Response(k, E);
                  })
                : C.then(N(t));
            } else if (c.includes('code_verifier=') && S) {
              (t = g[S]), (S = null);
              let u = c;
              return (
                t && t.codeVerifier != null && (u = H(u, t.codeVerifier)),
                fetch(e, {
                  body: u,
                  method: a.method,
                  headers: { ...T(e.headers) },
                  mode: a.mode,
                  cache: a.cache,
                  redirect: a.redirect,
                  referrer: a.referrer,
                  credentials: a.credentials,
                  integrity: a.integrity,
                }).then(N(t))
              );
            }
          })
          .then((c) => {
            c !== void 0
              ? f(c)
              : (console.log('success undefined'),
                r(new Error('Response is undefined inside a success')));
          })
          .catch((c) => {
            c !== void 0
              ? r(c)
              : (console.log('error undefined'),
                r(new Error('Response is undefined inside a error')));
          });
      });
      n.waitUntil(n.respondWith(l));
    }
  },
  m = {},
  G = (n) => {
    const e = n.ports[0],
      i = n.data,
      o = i.configurationName;
    let t = g[o];
    if ((trustedDomains == null && (trustedDomains = {}), !t)) {
      if (m[o] === void 0) {
        let s = trustedDomains[o];
        m[o] = Array.isArray(s) ? !1 : s.showAccessToken;
      }
      (g[o] = {
        tokens: null,
        state: null,
        codeVerifier: null,
        oidcServerConfiguration: null,
        oidcConfiguration: void 0,
        nonce: null,
        status: null,
        configurationName: o,
        hideAccessToken: !m[o],
      }),
        (t = g[o]),
        trustedDomains[o] || (trustedDomains[o] = []);
    }
    switch (i.type) {
      case 'clear':
        (t.tokens = null),
          (t.state = null),
          (t.codeVerifier = null),
          (t.status = i.data.status),
          e.postMessage({ configurationName: o });
        return;
      case 'init': {
        const s = i.data.oidcServerConfiguration;
        let d = trustedDomains[o];
        const l = D(d, 'oidc');
        l.find((r) => r === A) ||
          [
            s.tokenEndpoint,
            s.revocationEndpoint,
            s.userInfoEndpoint,
            s.issuer,
          ].forEach((r) => {
            K(l, r);
          }),
          (t.oidcServerConfiguration = s),
          (t.oidcConfiguration = i.data.oidcConfiguration);
        const f = i.data.where;
        if (
          (f === 'loginCallbackAsync' || f === 'tryKeepExistingSessionAsync'
            ? (S = o)
            : (S = null),
          !t.tokens)
        )
          e.postMessage({
            tokens: null,
            status: t.status,
            configurationName: o,
          });
        else {
          const r = { ...t.tokens };
          t.hideAccessToken && (r.access_token = _.ACCESS_TOKEN + '_' + o),
            r.refresh_token && (r.refresh_token = _.REFRESH_TOKEN + '_' + o),
            r.idTokenPayload &&
              r.idTokenPayload.nonce &&
              t.nonce != null &&
              (r.idTokenPayload.nonce = _.NONCE_TOKEN + '_' + o),
            e.postMessage({
              tokens: r,
              status: t.status,
              configurationName: o,
            });
        }
        return;
      }
      case 'setState':
        (t.state = i.data.state), e.postMessage({ configurationName: o });
        return;
      case 'getState': {
        const s = t.state;
        e.postMessage({ configurationName: o, state: s });
        return;
      }
      case 'setCodeVerifier':
        (t.codeVerifier = i.data.codeVerifier),
          e.postMessage({ configurationName: o });
        return;
      case 'getCodeVerifier': {
        e.postMessage({
          configurationName: o,
          codeVerifier:
            t.codeVerifier != null ? _.CODE_VERIFIER + '_' + o : null,
        });
        return;
      }
      case 'setSessionState':
        (t.sessionState = i.data.sessionState),
          e.postMessage({ configurationName: o });
        return;
      case 'getSessionState': {
        const s = t.sessionState;
        e.postMessage({ configurationName: o, sessionState: s });
        return;
      }
      case 'setNonce': {
        let s = i.data.nonce;
        s && (t.nonce = s), e.postMessage({ configurationName: o });
        return;
      }
      case 'getNonce': {
        const s = _.NONCE_TOKEN + '_' + o,
          d = t.nonce ? s : null;
        e.postMessage({ configurationName: o, nonce: d });
        return;
      }
      default:
        (t.items = { ...i.data }), e.postMessage({ configurationName: o });
    }
  };
p.addEventListener('install', $);
p.addEventListener('activate', z);
p.addEventListener('fetch', B);
p.addEventListener('message', G);
//# sourceMappingURL=OidcServiceWorker.js.map
