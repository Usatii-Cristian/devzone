"use strict";
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const updates = [
  {
    id: "6a0b525a1419ceefc0245292",
    title: "Prevenire — Parameterized Queries",
    content: `**SQL Injection** rămâne în top 3 vulnerabilități OWASP de peste 20 de ani — și este 100% prevenibilă. Soluția fundamentală: **Parameterized Queries** (interogări parametrizate), numite și Prepared Statements. Niciodată nu construi interogări SQL prin concatenare cu date de la utilizator.

**De ce concatenarea e periculoasă**

\`\`\`php
<?php
// VULNERABIL: concatenare directa
$username = $_POST['username']; // attacker: " OR '1'='1'--
$sql = "SELECT * FROM users WHERE username = '$username'";
// SQL executat: SELECT * FROM users WHERE username = '' OR '1'='1'--'
// Rezultat: returneaza TOTI utilizatorii! Autentificare bypassed.

// Atacuri mai grave:
$id = "1; DROP TABLE users;--";
$sql = "SELECT * FROM users WHERE id = $id";
// Executa doua comenzi! Sterge intreaga tabela.
\`\`\`

**Parameterized Queries cu PDO (PHP)**

\`\`\`php
<?php
$pdo = new PDO(
    "mysql:host=localhost;dbname=myapp;charset=utf8mb4",
    "user",
    "password",
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// SIGUR: placeholder ? sau :nume
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND activ = ?");
$stmt->execute([$_POST['username'], 1]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Cu placeholder-uri numite (mai lizibil)
$stmt = $pdo->prepare(
    "SELECT * FROM users WHERE email = :email AND password_hash = :hash"
);
$stmt->execute([
    ':email' => $_POST['email'],
    ':hash'  => hash('sha256', $_POST['password']),
]);
\`\`\`

**Parameterized Queries cu MySQLi**

\`\`\`php
<?php
$conn = new mysqli("localhost", "user", "password", "myapp");

// bind_param: tipuri s=string, i=integer, d=double, b=blob
$stmt = $conn->prepare("SELECT id, email FROM users WHERE username = ? AND varsta > ?");
$stmt->bind_param("si", $_POST['username'], $_POST['min_age']);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    echo $row['email'];
}
$stmt->close();
\`\`\`

**Parameterized Queries în Python (psycopg2 / SQLite)**

\`\`\`python
import sqlite3

conn = sqlite3.connect("app.db")
cursor = conn.cursor()

# SIGUR: placeholder ?
cursor.execute(
    "SELECT * FROM users WHERE username = ? AND activ = ?",
    (username, 1)  # tuple cu valorile — NICIODATA f-string sau % format
)

# psycopg2 (PostgreSQL): placeholder %s
cursor.execute(
    "SELECT * FROM users WHERE email = %s",
    (email,)  # tuplu obligatoriu, chiar si cu un singur param
)
\`\`\`

**Când parametrizarea nu ajunge — Whitelist pentru elemente dinamice**

Unele elemente SQL NU pot fi parametrizate — numele tabelelor, coloanelor, direcția de sortare:

\`\`\`php
<?php
// GRESIT: nu poti parametriza numele coloanei de sortare
$sql = "SELECT * FROM produse ORDER BY :coloana"; // NU functioneaza!

// CORECT: whitelist explicita
$allowed_columns = ['pret', 'nume', 'data_creare', 'rating'];
$sort = in_array($_GET['sort'], $allowed_columns) ? $_GET['sort'] : 'id';
$sql = "SELECT * FROM produse ORDER BY $sort"; // sigur: e din whitelist
\`\`\`

**Layered Defense — apărare în adâncime**

Parameterized queries sunt stratul 1. Adaugă și:

\`\`\`
Strat 1: Parameterized Queries — previne SQL injection fundamental
Strat 2: Least Privilege — utilizatorul DB are doar SELECT/INSERT, nu DROP/ALTER
Strat 3: Input Validation — validare stricta a tipului si formatului
Strat 4: WAF (Web Application Firewall) — detectie pattern-uri SQL malicioase
Strat 5: Monitorizare — alerte pentru query-uri anormale sau lente
\`\`\`

\`\`\`php
<?php
// Bune practici cumulate
$pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false, // prepared statements REALE, nu simulate
]);

function getUser(PDO $pdo, string $email): ?array {
    // Validare input inainte de query
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException("Email invalid");
    }
    $stmt = $pdo->prepare("SELECT id, email, rol FROM users WHERE email = ?");
    $stmt->execute([$email]);
    return $stmt->fetch() ?: null;
}
\`\`\`

**Greșeli comune**

• **ORM-urile nu sunt magic-safe** — Eloquent, Doctrine, SQLAlchemy sunt sigure *dacă* folosești metodele lor, dar \`DB::select("SELECT * WHERE id = $id")\` e la fel de vulnerabil
• **\`PDO::ATTR_EMULATE_PREPARES => true\`** — modul implicit în unele versiuni PHP emulează prepared statements pe client-side, ceea ce e mai puțin sigur; dezactivează-l explicit
• **Sanitizarea nu e suficientă** — \`mysqli_real_escape_string\` și \`htmlspecialchars\` NU înlocuiesc prepared statements; se pot ocoli în anumite contexte`,
  },
  {
    id: "6a0b52661419ceefc02452d3",
    title: "Phases of Incident Response",
    content: `**Incident Response (IR)** este procesul structurat prin care o organizație detectează, analizează, conține și recuperează dintr-un incident de securitate. Fără un plan prestabilit, reacția la un incident devine haotică, costisitoare și adesea incompletă. Standardul NIST SP 800-61 definește 4 faze principale.

**Faza 1: Preparation (Pregătire)**

Faza de pregătire se desfășoară ÎNAINTE de orice incident. O organizație bine pregătită răspunde de 3-5x mai rapid:

\`\`\`
Activitati de pregatire:
├── Echipa de raspuns (CSIRT — Computer Security Incident Response Team)
│   ├── Responsabilitati clare: cine face ce in primele 30 minute
│   ├── Informatii de contact 24/7 pentru toti membrii echipei
│   └── Escaladare: cand implicam managementul / avocatii / autoritatile
├── Documentatie
│   ├── Network topology si asset inventory actualizat
│   ├── Playbooks pentru tipuri de incidente (ransomware, phishing, DDoS)
│   └── Contact furnizori externi (ISP, cloud provider, firma de forensics)
├── Unelte preinstalate
│   ├── SIEM (Splunk, ELK, Wazuh) — agregate loguri
│   ├── EDR (CrowdStrike, SentinelOne) — endpoint detection
│   └── Imagini curate ale sistemelor critice pentru restore rapid
└── Exercitii: tabletop exercises, simulari de incident quarterly
\`\`\`

**Faza 2: Detection & Analysis (Detectie si Analiza)**

Detectarea timpurie reduce dramatic costul unui incident. Media industriala: 197 zile pana la detectare, 69 zile pana la containment (IBM Cost of a Data Breach Report):

\`\`\`
Surse de detectare:
├── SIEM alerts (log aggregation + correlation rules)
├── IDS/IPS (Intrusion Detection/Prevention Systems)
├── Antivirus / EDR alerts
├── Utilizatori care raporteaza comportament ciudat
├── Ticket-uri de support neobisnuite
└── Notificari externe (CERT, parteneri, clienti afectati)

Analiza initiala — primele 30 minute:
├── Ce sistem/utilizator e afectat?
├── Cand a inceput incidentul? (timeline)
├── E in desfasurare sau s-a incheiat?
├── Exista date exfiltrate sau criptate?
└── Care e impactul potential (financial, legal, reputational)?
\`\`\`

\`\`\`bash
# Comenzi tipice de analiza initiala pe Linux
# Conexiuni de retea active (posibil C2 communication)
ss -tulnp
netstat -antp

# Procese suspecte
ps aux | sort -rk 3,3 | head -20  # top CPU
lsof -i                             # fisiere deschise / conexiuni

# Loguri recente
journalctl -xe --since "1 hour ago"
tail -n 100 /var/log/auth.log       # autentificari
last -a                             # login history

# Fisiere modificate recent (ultimele 24h)
find / -mtime -1 -type f 2>/dev/null | grep -v proc
\`\`\`

**Faza 3: Containment, Eradication & Recovery (Containment)**

\`\`\`
Containment pe termen scurt (imediat):
├── Izolarea sistemului afectat de retea (fara oprire! — pierde memoria RAM)
│   ├── VLAN isolation sau firewall rule
│   └── Dezactivare conta compromise (nu sterge!)
├── Blocare IP-uri/domenii malicioase in firewall/DNS
└── Capture memorie RAM INAINTE de izolare (volatila — se pierde la restart)

Containment pe termen lung:
├── Patch vulnerabilitate exploatata
├── Reset credentiale compromise
└── Verificare alte sisteme similare (lateral movement?)

Eradication:
├── Eliminare malware / backdoors
├── Curatare sau reinstalare sistem din backup curat
└── Verificare ca amenintarea e complet eliminata

Recovery:
├── Restaurare din backup verificat ca clean
├── Monitorizare intensiva post-recovery (14-30 zile)
└── Verificare integritate date restaurate
\`\`\`

**Faza 4: Post-Incident Activity (Lessons Learned)**

\`\`\`
Post-mortem (in 2 saptamani de la incident):
├── Timeline complet: de la primul semn pana la recovery
├── Root cause analysis: cum a intrat atacatorul?
├── Detection gap: de ce nu am detectat mai rapid?
├── Response gaps: ce a intarziat raspunsul nostru?
├── Actiuni corective: ce schimbam concret?
└── Documentare pentru training si referinta viitoare

Raportare legala (unde e cazul):
├── GDPR: raportare la ANPC in max 72 ore daca sunt date personale afectate
├── Notificare clienti afectati
└── Coordonare cu autoritatile (DIICOT, Politia Romana Cybercrime) daca e infractiune
\`\`\`

**Greșeli comune în Incident Response**

• **Oprirea sistemului imediat** — distruge evidența din memoria RAM (procese, conexiuni, chei de criptare temporare); izolează de rețea FĂRĂ oprire
• **Lucrul direct pe sistemul compromis** — modifici timestamp-urile și distrugi evidențele; lucrează pe o copie forensică
• **Comunicare publică prematură** — anunțurile înainte de containment alertează atacatorul și îl determină să accelereze sau să șteargă urmele`,
  },
  {
    id: "6a0b52681419ceefc02452df",
    title: "Security checklist pentru web apps",
    content: `Un **security checklist** sistematizează verificările de securitate pentru a nu omite aspecte critice. Aplicațiile web au o suprafață de atac mare — autentificare, date, transport, dependențe, configurare — fiecare zonă necesitând atenție specifică.

**Autentificare și Sesiuni**

\`\`\`
Autentificare:
[x] Parole stocate cu bcrypt/argon2id (nu MD5, SHA1, SHA256 fara salt)
[x] Politica de parole: min 12 caractere, complexitate
[x] Blocare cont dupa N incercari esuate (rate limiting)
[x] MFA disponibil si incurajat (TOTP, WebAuthn)
[x] Reset parola sigur: token unic, expira in 1h, valid o singura data
[x] Autentificare prin "Forgot password" nu reveleaza daca emailul exista

Sesiuni:
[x] Session ID lung si aleatoriu (min 128 biti)
[x] Regenerare Session ID dupa autentificare (previne session fixation)
[x] Cookie-uri cu Secure + HttpOnly + SameSite=Strict/Lax
[x] Timeout sesiune inactiva (30 min recomandat)
[x] Logout complet (sterge sesiunea server-side, nu doar cookie)
\`\`\`

**Input Validation și Protecție date**

\`\`\`
Input/Output:
[x] Validare input: tip, format, lungime, charset
[x] Parametrized queries pentru orice interactiune cu DB
[x] Output escaping: htmlspecialchars() inainte de HTML output
[x] Content-Type validat pentru upload-uri de fisiere
[x] Dimensiune maxima pentru fisiere si request body

Autorizare:
[x] Verificare permisiuni la fiecare endpoint, nu doar la login
[x] Principiul Least Privilege: userul vede/face doar ce are nevoie
[x] IDOR prevention: verifica ca resursa apartine utilizatorului curent
[x] Admin endpoints protejate suplimentar (IP whitelist, MFA obligatoriu)
\`\`\`

**HTTP Headers de Securitate**

\`\`\`
[x] HTTPS obligatoriu (HSTS cu min 1 an + preload)
[x] Content-Security-Policy configurata (blocheaza XSS inline)
[x] X-Frame-Options: DENY sau SAMEORIGIN (previne clickjacking)
[x] X-Content-Type-Options: nosniff
[x] Referrer-Policy: strict-origin-when-cross-origin
[x] Permissions-Policy: camera=(), microphone=() pentru ce nu folosesti

Verificare cu Mozilla Observatory (observatory.mozilla.org):
$ curl -I https://exemplu.ro | grep -i "strict\|content-sec\|x-frame"
\`\`\`

**Dependențe și Configurare**

\`\`\`
Dependente:
[x] Dependente actualizate la versiuni fara CVE-uri critice
[x] audit npm / composer audit ruleaza in CI/CD
[x] Software Composition Analysis (SCA) tool integrat
[x] Dependente inutile eliminate

Configurare:
[x] Credentiale in variabile de mediu, nu in cod sau config files commise
[x] Debug mode dezactivat in productie
[x] Error messages generice catre utilizator (nu stack traces!)
[x] Loguri nu contin parole, carduri, date personale
[x] .env in .gitignore
\`\`\`

**Exemplu — verificare automata cu script**

\`\`\`bash
#!/bin/bash
# quick-security-check.sh

echo "=== Security Headers ==="
curl -si https://$1 | grep -E "Strict-Transport|Content-Security|X-Frame|X-Content"

echo "=== SSL/TLS ==="
echo | openssl s_client -connect $1:443 -brief 2>/dev/null | head -5

echo "=== Open ports ==="
nmap -F $1 2>/dev/null | grep open

echo "=== Check for .env exposure ==="
curl -so /dev/null -w "%{http_code}" https://$1/.env
\`\`\`

**Top vulnerabilități OWASP pe scurt**

\`\`\`
A01: Broken Access Control — verifica autorizare la FIECARE cerere
A02: Cryptographic Failures — HTTPS everywhere, parole cu bcrypt
A03: Injection — parameterized queries, no eval()
A04: Insecure Design — threat modeling in design phase
A05: Security Misconfiguration — defaults schimbate, debug off
A06: Vulnerable Components — dependente actualizate
A07: Auth Failures — MFA, rate limiting, session management corect
A08: Software Integrity — verificare semnatura pachetelor
A09: Logging Failures — loguri complete si monitorizate
A10: SSRF — validare URL-uri externe, blocheaza metadata endpoints
\`\`\`

**Greșeli comune**

• **Securitate implementată după lansare** — costul unui fix de securitate post-lansare e de 30x mai mare decât în design; integrează securitatea din ziua 1
• **Checklist bifat mecanic** — un checklist fără înțelegere e inutil; fiecare item trebuie înțeles, nu bifat automat
• **Testare doar manuală** — integrează verificări automate (SAST, DAST, dependency scanning) în pipeline CI/CD pentru verificare continuă`,
  },
  {
    id: "6a0b526d1419ceefc02452f7",
    title: "SSRF (Server-Side Request Forgery)",
    content: `**SSRF** (Server-Side Request Forgery — Falsificarea Cererilor de pe Server) este o vulnerabilitate prin care un atacator face serverul să inițieze cereri HTTP towards resurse interne sau externe neautorizate. Serverul acționează ca proxy involuntar, ocolind firewall-urile și controalele de acces.

**Cum funcționează SSRF**

Aplicatia ia un URL de la utilizator și face o cerere server-side:

\`\`\`python
# Exemplu vulnerabil (Python/Flask)
import requests
from flask import Flask, request

app = Flask(__name__)

@app.route('/preview')
def preview():
    url = request.args.get('url')
    # VULNERABIL: nicio validare a URL-ului!
    response = requests.get(url)  # serverul face cererea
    return response.text

# Atacatorul trimite:
# /preview?url=http://169.254.169.254/latest/meta-data/  (AWS metadata!)
# /preview?url=http://localhost:8080/admin               (serviciu intern!)
# /preview?url=file:///etc/passwd                        (fisiere locale!)
\`\`\`

**Impactul SSRF**

\`\`\`
Scenarii de atac SSRF:
├── AWS/GCP/Azure Metadata Service
│   └── http://169.254.169.254/ → credentiale IAM temporare!
│       Permite preluarea contului cloud prin IMDS
├── Acces la servicii interne
│   ├── http://localhost:6379/ → Redis (fara autentificare adesea)
│   ├── http://internal-db:5432/ → PostgreSQL intern
│   └── http://internal-api/admin → panel admin intern neexpus public
├── Port scanning intern
│   └── http://10.0.0.1:PORT → afla ce servicii ruleaza in retea interna
└── Exfiltrare fisiere (daca suporta schema file://)
    └── file:///etc/passwd, file:///app/.env
\`\`\`

**Prevenirea SSRF — Allowlist strict**

\`\`\`python
import ipaddress
import re
import requests
from urllib.parse import urlparse

ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com', 'fonts.googleapis.com']

def is_safe_url(url: str) -> bool:
    try:
        parsed = urlparse(url)
    except Exception:
        return False

    # Verifica schema: doar https
    if parsed.scheme not in ('https',):
        return False

    # Verifica hostname in whitelist
    hostname = parsed.hostname
    if hostname not in ALLOWED_DOMAINS:
        return False

    # Verifica ca hostname-ul nu rezolva la IP privat
    try:
        ip = ipaddress.ip_address(socket.gethostbyname(hostname))
        if ip.is_private or ip.is_loopback or ip.is_link_local:
            return False  # blocheaza 10.x.x.x, 172.16.x.x, 192.168.x.x, 127.x.x.x
    except Exception:
        return False

    return True

@app.route('/preview')
def preview():
    url = request.args.get('url', '')
    if not is_safe_url(url):
        return {"error": "URL nepermis"}, 400
    response = requests.get(url, timeout=5)
    return response.text
\`\`\`

**Dezactivarea metadata service (AWS)**

\`\`\`bash
# IMDSv2 (Instance Metadata Service v2) — previne SSRF la metadata
# In EC2: forteaza token-based access (nu mai functioneaza GET direct)
aws ec2 modify-instance-metadata-options \
    --instance-id i-xxxx \
    --http-tokens required \       # token obligatoriu
    --http-put-response-hop-limit 1

# Sau in user-data la lansarea instantei
\`\`\`

**Blind SSRF — detectare**

Uneori aplicatia nu returneaza raspunsul, dar serverul face cererea:

\`\`\`
Detectare Blind SSRF:
1. Foloseste Burp Collaborator sau interactsh.com — domain unic pe care il controlezi
2. Trimite URL-ul tau ca parametru: ?url=https://UNIQUE.burpcollaborator.net/
3. Daca primesti o cerere HTTP de la serverul tinta -> SSRF confirmat

Tooluri:
- Burp Suite Pro (Collaborator)
- interactsh (open-source): https://github.com/projectdiscovery/interactsh
\`\`\`

**Greșeli comune**

• **Blocarea doar a IP-urilor literale** — un atacator poate folosi redirects (\`http://evil.com\` redirectioneaza la \`192.168.1.1\`) sau DNS rebinding pentru a ocoli filtrele de IP
• **Validare doar la regex** — regex-urile pe URL pot fi ocolite cu URL encoding, caractere unicode, etc.; validează DUPĂ rezolvarea DNS
• **Schema \`file://\` uitate** — blocarea \`http://localhost\` nu blochează \`file:///etc/passwd\`; validează și filtrează schema URL explicit`,
  },
  {
    id: "6a0b526f1419ceefc0245300",
    title: "Multi-Factor Authentication (MFA)",
    content: `**Multi-Factor Authentication (MFA)** adaugă un al doilea (sau al treilea) strat de verificare a identității pe lângă parolă. Chiar dacă parola e compromisă, atacatorul nu poate accesa contul fără al doilea factor. Statisticile Microsoft arată că MFA blochează 99.9% din atacurile automate.

**Cei trei factori de autentificare**

• **Ceva ce știi** — parolă, PIN, întrebare de securitate (cel mai slab!)
• **Ceva ce ai** — telefon (TOTP app), token hardware (YubiKey), SMS (cel mai slab MFA!)
• **Ceva ce ești** — amprentă, recunoaștere facială, iris scan (biometrie)

MFA înseamnă combinarea a CEL PUȚIN 2 factori din categorii diferite.

**TOTP — Time-Based One-Time Password (RFC 6238)**

TOTP (Google Authenticator, Authy, Microsoft Authenticator) generează coduri de 6 cifre valabile 30 secunde:

\`\`\`python
import pyotp
import qrcode

def setup_mfa(user_email: str) -> dict:
    # Genereaza un secret unic de 32 caractere base32
    secret = pyotp.random_base32()

    # URI pentru QR code (scanat de authenticator app)
    totp = pyotp.TOTP(secret)
    provisioning_uri = totp.provisioning_uri(
        name=user_email,
        issuer_name="DevZone App"
    )

    # Genereaza QR code pentru afisare
    qr_img = qrcode.make(provisioning_uri)
    qr_img.save(f"/tmp/qr_{user_email}.png")

    return {
        "secret": secret,  # stocheaza encrypted in DB!
        "qr_uri": provisioning_uri,
        "backup_codes": generate_backup_codes()
    }

def verify_totp(user_secret: str, code: str) -> bool:
    totp = pyotp.TOTP(user_secret)
    # valid_window=1 permite +/- 30 secunde pentru clock skew
    return totp.verify(code, valid_window=1)

def generate_backup_codes() -> list:
    import secrets
    return [secrets.token_hex(5).upper() for _ in range(10)]
    # Genereaza 10 coduri de backup de unica folosinta
\`\`\`

**Fluxul complet de autentificare cu MFA**

\`\`\`python
from flask import Flask, session, request, jsonify

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = db.find_user_by_email(email)
    if not user or not verify_password(password, user.password_hash):
        return jsonify({"error": "Credentiale invalide"}), 401

    if user.mfa_enabled:
        # Nu logam inca — cream o sesiune temporara de MFA
        session['mfa_pending_user_id'] = user.id
        session['mfa_pending_expires'] = time.time() + 300  # 5 minute
        return jsonify({"mfa_required": True}), 200

    # Fara MFA: logam direct
    session['user_id'] = user.id
    return jsonify({"success": True}), 200

@app.route('/verify-mfa', methods=['POST'])
def verify_mfa():
    pending_id = session.get('mfa_pending_user_id')
    expires = session.get('mfa_pending_expires', 0)

    if not pending_id or time.time() > expires:
        return jsonify({"error": "Sesiune MFA expirata"}), 401

    user = db.get_user(pending_id)
    code = request.json.get('code', '')

    if verify_totp(user.mfa_secret, code):
        session.pop('mfa_pending_user_id', None)
        session['user_id'] = user.id  # autentificare completa
        return jsonify({"success": True}), 200

    return jsonify({"error": "Cod MFA invalid"}), 401
\`\`\`

**WebAuthn / FIDO2 — cel mai puternic factor**

WebAuthn folosește chei criptografice asimetrice generate de hardware:

\`\`\`javascript
// Înregistrare WebAuthn (browser)
async function registerPasskey(userId, username) {
    const credential = await navigator.credentials.create({
        publicKey: {
            challenge: new Uint8Array(32), // generat de server, random
            rp: { name: "DevZone", id: "devzone.vercel.app" },
            user: {
                id: new TextEncoder().encode(userId),
                name: username,
                displayName: username
            },
            pubKeyCredParams: [
                { type: "public-key", alg: -7 },  // ES256
                { type: "public-key", alg: -257 } // RS256
            ],
            authenticatorSelection: {
                requireResidentKey: true, // Passkey (stocat pe device)
                userVerification: "required" // biometrie/PIN obligatoriu
            }
        }
    });
    // Trimite credential.response la server pentru stocare
}
\`\`\`

**SMS OTP — cel mai slab factor și de ce**

SMS OTP poate fi compromis prin:
• **SIM Swapping** — atacatorul convinge operatorul să transfere numărul pe SIM-ul lui
• **SS7 Protocol Attacks** — interceptare la nivel de rețea telefonică
• **Phishing în timp real** — atacatorul redirectionează codul SMS prin pagina sa falsa

Concluzie: SMS > nimic, dar WebAuthn > TOTP > SMS ca securitate.

**Greșeli comune**

• **Stocarea secretului TOTP în plaintext** — secretul trebuie criptat în DB cu o cheie din variabile de mediu; dacă DB-ul e compromis, MFA e inutil dacă secretul e plaintext
• **MFA optional ignorat** — mai bine enforce MFA pentru conturi privilegiate (admini) decât să îl lași complet optional
• **Codurile de backup uitate** — utilizatorii NU trebuie să piardă accesul dacă pierd telefonul; generează coduri de backup la setup și stochează-le în siguranță`,
  },
  {
    id: "6a0b52721419ceefc024530e",
    title: "Tipuri de atacuri de social engineering",
    content: `**Social engineering** (inginerie socială) este arta manipulării psihologice a oamenilor pentru a obține acces neautorizat sau informații confidențiale. Este adesea mai eficient decât atacurile tehnice — este mai ușor să manipulezi un om decât să spargi un sistem bine securizat. Compania de cercetare Verizon estimează că 82% din breșele de securitate implică factorul uman.

**Phishing — cel mai comun atac**

Phishing-ul implică mesaje false (email, SMS, WhatsApp) care par a veni de la surse legitime:

\`\`\`
Tipuri de phishing:
├── Phishing clasic — emailuri de masa catre mii de tinte
│   Exemplu: "Contul tau PayPal a fost suspendat. Click aici."
├── Spear Phishing — tinta specifica, personalizat
│   Exemplu: "Ion, atasez contractul discutat la intalnirea de marti..."
│   (atacatorul a cercetat victima pe LinkedIn, stie numele, functia)
├── Whaling — tinta: executivi C-level (CEO, CFO)
│   Exemplu: CFO primeste email "de la CEO": "Trimite 50.000 EUR urgent..."
├── Smishing — phishing prin SMS
│   Exemplu: "Pachetul tau DHL e blocat. Plateste taxa: [link malitios]"
└── Vishing — phishing prin telefon (voice)
    Exemplu: "Sunt de la Microsoft. Calculatorul dvs. are virus..."
\`\`\`

**Pretexting — crearea unui scenariu fals**

Atacatorul creează o identitate falsă (pretext) pentru a obține informații:

\`\`\`
Scenarii clasice de pretexting:
├── "Sunt de la IT support, trebuie sa iti resetez parola urgent"
│   → victima da credentialele "pentru resetare"
├── "Sunt auditor extern, am nevoie de acces la sistemele contabile"
│   → obtine acces la informatii financiare sensibile
├── "Sunt noul coleg al lui Mihai care e in concediu, ai putea sa..."
│   → profita de dorinta oamenilor de a fi helpfulli
└── Impersonarea autoritatilor (politie, ANAF, banca)
    → victima coopereaza de teama consecintelor
\`\`\`

**Baiting, Quid Pro Quo, Tailgating**

\`\`\`
Baiting: ademenire cu ceva atractiv
→ USB stick lasat in parcare cu label "Salarii 2024"
→ victima il introduce in calculator (contine malware)
→ Software pirat cu "free crack" (troian inclus)

Quid Pro Quo: schimb — ceva pentru ceva
→ "Te ajut sa rezolvi problema IT, dar am nevoie de parola temporar"
→ Sondaje online cu premii fictive in schimbul datelor personale

Tailgating / Piggybacking: acces fizic neautorizat
→ Atacatorul urmeaza un angajat prin usa securizata "tinand usile deschise"
→ "Scuza-ma, am mainile ocupate, poti tine usa?" — acces fara badge

Water Holing:
→ Atacatorul infecteaza un site frecventat de tinta (ex: forum profesional)
→ Vizitatorii legitimi sunt infectati pasiv
\`\`\`

**Indicatori de atac — cum recunoști social engineering**

\`\`\`
Red flags in emailuri:
├── Urgenta artificiala ("trebuie sa actionezi in 2 ore sau contul se sterge!")
├── Amenintari sau frica ("ANAF va incepe executarea silita...")
├── Recompense neasteptate ("Ai castigat 10.000 EUR!")
├── Cerere de date sensibile (parole, carduri) prin email — niciodata legitima
├── Expeditor diferit de domeniul afisat (ion@bank.com dar trimis de bank.evil.com)
└── Link-uri catre domenii similare (paypa1.com, arnazon.com, g00gle.com)

Red flags in apeluri telefonice:
├── Presiune de a actiona ACUM
├── Solicita parole, coduri OTP sau acces remote
└── Nu vor sa confirme identitatea prin canalul oficial
\`\`\`

**Apărare organizațională**

\`\`\`
Masuri tehnice:
├── Email filtering (SPF, DKIM, DMARC) — blocheaza spoofing
├── Anti-phishing training platforma (KnowBe4, Proofpoint)
├── MFA — chiar daca parola e compromisa, accesul e blocat
└── Politica zero-trust: verificare identitate la fiecare actiune importanta

Masuri de proces:
├── Verificare obligatorie prin canal secundar pentru tranzactii financiare
├── "Dreptul de a refuza" — angajatii pot refuza cereri suspecte fara frica
└── Simulari de phishing trimise angajatilor + training imediat dupa click
\`\`\`

**Greșeli comune**

• **"Nu mi se poate intampla mie"** — social engineering targetează emoții universale (frică, urgență, curiozitate, dorința de a ajuta); oricine e vulnerabil fără training
• **Training anual uitat** — un training anual de o oră nu e suficient; simulările regulate de phishing sunt singura metodă dovedită eficient
• **Trustul excesiv în identitate声clarata** — "Buna, sunt de la IT" nu verifică identitatea; sună înapoi la numărul din directorul oficial, nu cel dat de "persoana"`,
  },
  {
    id: "6a0b52741419ceefc0245318",
    title: "Permissions-Policy și alte security headers",
    content: `**Security headers** sunt directive HTTP trimise de server browserului care activează sau dezactivează funcționalități de securitate. Configurarea corectă a acestor headere poate preveni categorii întregi de atacuri — XSS, clickjacking, MIME sniffing, accesul neautorizat la API-uri de browser.

**Permissions-Policy (fostul Feature-Policy)**

\`Permissions-Policy\` controlează accesul la API-uri puternice ale browserului — cameră, microfon, locație, accelerometru, etc. Ideal: dezactivează tot ce nu folosești:

\`\`\`
# Nginx: dezactivare completa pentru features nefolosite
add_header Permissions-Policy "
    camera=(),
    microphone=(),
    geolocation=(),
    payment=(),
    usb=(),
    magnetometer=(),
    accelerometer=(),
    gyroscope=(),
    fullscreen=(self),
    display-capture=()
" always;

# Daca folosesti geolocation: permite doar pe propriul origin
add_header Permissions-Policy "geolocation=(self), camera=(), microphone=()";

# Apache:
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
\`\`\`

**Content-Security-Policy (CSP) — protecție XSS**

CSP este cel mai puternic header de securitate — specifică exact de unde poate fi încărcat JavaScript, CSS, imagini, etc.:

\`\`\`
# Politica stricta pentru SPA (Next.js, React)
Content-Security-Policy:
    default-src 'self';
    script-src 'self' 'nonce-{RANDOM_NONCE}';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://cdn.example.com;
    font-src 'self' https://fonts.googleapis.com;
    connect-src 'self' https://api.example.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';

# Testing CSP fara blocare: Content-Security-Policy-Report-Only
# Browserul raporteaza violatiile dar nu blocheaza (util la debut)
\`\`\`

**Toate headerele esențiale — configurare Nginx**

\`\`\`nginx
server {
    # HSTS: forteaza HTTPS pentru 2 ani, include subdomenii
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Previne MIME type sniffing (executa fisierele ca tipul declarat, nu ghicit)
    add_header X-Content-Type-Options "nosniff" always;

    # Previne clickjacking: pagina nu poate fi in iframe pe alte site-uri
    add_header X-Frame-Options "DENY" always;

    # Controleaza ce informatii trimite browserul in Referer header
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Dezactiveaza DNS prefetching si alte optimizari ce pot scurge info
    add_header X-DNS-Prefetch-Control "off" always;

    # Sterge header-ul care reveleaza versiunea serverului
    server_tokens off;

    # Content-Security-Policy
    add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none'" always;

    # Permissions-Policy
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
}
\`\`\`

**Verificarea header-elor — tooluri**

\`\`\`bash
# Verificare rapida cu curl
curl -sI https://exemplu.com | grep -iE "strict|content-sec|x-frame|x-content|referrer|permissions"

# Verificare online:
# https://securityheaders.com — scor A+ la A-F
# https://observatory.mozilla.org — analiza completa

# Testare CSP:
# https://csp-evaluator.withgoogle.com — evalueaza strictetea politicii CSP
\`\`\`

**Cross-Origin Headers (CORS/COEP/COOP)**

\`\`\`
Pentru aplicatii care au nevoie de izolare completa (SharedArrayBuffer, etc.):

Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Resource-Policy: same-origin

CORS (pentru API-uri):
Access-Control-Allow-Origin: https://app.example.com
# NU: Access-Control-Allow-Origin: * pentru endpoint-uri autentificate!
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true  # doar cu origin specific, nu cu *
\`\`\`

**Greșeli comune**

• **\`Content-Security-Policy: unsafe-inline\`** — permite orice script inline, anulând protecția XSS; migrează la nonce-based sau hash-based CSP
• **\`Access-Control-Allow-Origin: *\` cu credentials** — combinația \`*\` + \`Allow-Credentials: true\` este invalidă și periculoasă; browserele o blochează, dar codul poate face cereri fără credentials
• **Headere setate doar pe unele response-uri** — folosește \`always\` în Nginx sau middleware la nivel de aplicație pentru a garanta prezența pe orice răspuns`,
  },
  {
    id: "6a0b527b1419ceefc0245343",
    title: "Certificate, PKI si atacuri pe criptografie asimetrica",
    content: `**Public Key Infrastructure (PKI)** este sistemul de încredere care stă la baza HTTPS-ului, semnăturilor digitale și autentificarii certificate. Fără PKI, nu ar exista mod sigur de a verifica identitatea unui server — oricine ar putea finge că este banca ta.

**Criptografia asimetrică — principiul de bază**

Criptografia asimetrică foloseste o **pereche de chei** — una publică și una privată:
• **Cheia publică** — distribuită liber; oricine o poate folosi
• **Cheia privată** — ținută în secret absolut; pierderea sau furtul ei compromite totul

\`\`\`
Doua operatii fundamentale:

1. Criptare/Decriptare:
   - Expeditorul cripteaza cu cheia PUBLICA a destinatarului
   - Doar destinatarul (cu cheia PRIVATA) poate decripta
   → Asigura confidentialitate

2. Semnatura Digitala:
   - Semnatarul creeaza hash din mesaj si il "cripteaza" cu cheia PRIVATA
   - Oricine cu cheia PUBLICA poate verifica semnatura
   → Asigura autenticitate si integritate (non-repudiere)
\`\`\`

**Certificate X.509 — anatomia unui certificat SSL/TLS**

\`\`\`bash
# Vizualizarea unui certificat
openssl s_client -connect google.com:443 -showcerts 2>/dev/null | \
    openssl x509 -noout -text | head -40

# Campuri importante intr-un certificat:
# Subject: CN=*.google.com, O=Google LLC, C=US
# Issuer: CN=GTS CA 1C3, O=Google Trust Services LLC
# Validity: Not Before: Jan  1 2024 / Not After: Apr  1 2024
# Subject Alternative Names: *.google.com, google.com
# Public Key Algorithm: rsaEncryption (sau id-ecPublicKey pentru ECDSA)
# Signature Algorithm: sha256WithRSAEncryption

# Verifica expirarea certificatelor (automatizat in CI/CD)
openssl s_client -connect exemplu.com:443 2>/dev/null | \
    openssl x509 -noout -dates
\`\`\`

**Lanțul de încredere PKI**

\`\`\`
Ierarhia de Certificate Authorities (CA):

Root CA (auto-semnat, in browser/OS trust store)
    ↓  semneaza
Intermediate CA
    ↓  semneaza
Certificate SSL al site-ului

Browserul verifica:
1. Semnatura pe certificatul site-ului → valida, semnata de Intermediate CA
2. Semnatura Intermediate CA → valida, semnata de Root CA
3. Root CA → in trust store-ul browserului? DA → HTTPS valid
Daca oricare verifica esueaza → "Your connection is not private" (ERR_CERT_AUTHORITY_INVALID)
\`\`\`

**Emiterea unui certificat gratuit (Let's Encrypt)**

\`\`\`bash
# Certbot (Let's Encrypt client)
sudo apt install certbot python3-certbot-nginx

# Emite si configureaza automat in Nginx
sudo certbot --nginx -d exemplu.com -d www.exemplu.com

# Reinnoire automata (valabil 90 zile — reinnoire recomandata la 60 zile)
sudo crontab -e
# Adauga:
# 0 3 * * * /usr/bin/certbot renew --quiet

# Verificare data expirare
echo | openssl s_client -connect exemplu.com:443 2>/dev/null | \
    openssl x509 -noout -enddate
\`\`\`

**Atacuri pe PKI și criptografie asimetrică**

\`\`\`
1. Man-in-the-Middle (MitM):
   Atacatorul se interpune intre client si server, prezentand propriul certificat
   → Aparare: Certificate Pinning, HSTS, HPKP (deprecat)

2. Certificate Spoofing:
   Un CA compromis sau rau-intentionat emite certificate false pentru domenii terte
   → Aparare: Certificate Transparency (CT) Logs — toate certificatele sunt publice
   → Verificare: crt.sh — cauta certificate emise pentru domeniul tau

3. Private Key Compromise:
   Cheia privata este furata (server compromis, backup nesecurizat)
   → Masuri: stocare in HSM (Hardware Security Module), revocarea imediata cu CRL/OCSP
   → Verificare: OCSP Stapling confirma certificatul nu e revocat

4. Weak Key Generation:
   Chei RSA < 2048 biti, ECDSA pe curbe slabe pot fi factorizate
   → Standard curent: RSA-4096 sau ECDSA P-256/P-384

5. Downgrade Attack (POODLE, BEAST):
   Forteaza negocierea unui protocol mai vechi (SSL3, TLS1.0) vulnerabil
   → Aparare: dezactiveaza TLS <1.2 in server config; ideal doar TLS 1.3
\`\`\`

**Configurare TLS sigură — Nginx**

\`\`\`nginx
ssl_protocols TLSv1.2 TLSv1.3;  # dezactiveaza SSL3, TLS1.0, TLS1.1
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;    # in TLS1.3 clientul alege
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_stapling on;                  # OCSP Stapling — verificare revocare
ssl_stapling_verify on;
\`\`\`

**Greșeli comune**

• **Certificate auto-semnate în producție** — browserele le blochează și utilizatorii învatp să ignore avertismentele de securitate, ceea ce e periculos
• **Nerestartarea serviciului după reînnoire** — Certbot reînnoiește certificatul pe disc, dar serviciul (Nginx, Apache) mai folosește vechiul cert; configurează hook-ul de reînnoire
• **Cheia privată în repository Git** — odată compromisă, emite imediat un certificat nou cu o cheie nouă și revocă-l pe cel vechi`,
  },
  {
    id: "6a0b52811419ceefc0245368",
    title: "Burp Suite si testarea aplicatiilor web",
    content: `**Burp Suite** este cel mai folosit tool de penetration testing pentru aplicații web, creat de PortSwigger. Funcționează ca un **proxy HTTP** — se interpune între browser și server, permițând interceptarea, modificarea și redirecționarea oricărei cereri HTTP/HTTPS.

**Configurarea Burp Suite ca proxy**

\`\`\`
Pași de configurare (Burp Suite Community/Pro):

1. Porneste Burp Suite → Proxy → Options
   - Listener: 127.0.0.1:8080 (sau alt port)
   - Interceptare: ON

2. Configureaza browser-ul:
   Firefox: Settings → Network → Manual proxy: HTTP 127.0.0.1:8080
   Chrome: Extensia FoxyProxy sau setare sistem
   Sau foloseste Burp Browser (inclus) — pre-configurat

3. Instalare certificat CA Burp:
   - Viziteaza http://burpsuite/ sau http://127.0.0.1:8080
   - Descarca certificatul CA Burp
   - Instaleaza in browser/system (permite HTTPS intercept)
   - Fara certificat: HTTPS va fi blocat de browser
\`\`\`

**Proxy — interceptarea și modificarea cererilor**

\`\`\`http
# Cerere interceptata de Burp (poti modifica orice inainte de trimitere):
POST /api/login HTTP/1.1
Host: target.com
Content-Type: application/json

{"username":"admin","password":"wrong_pass"}

# Modifica parola si retrimite:
{"username":"admin","password":"' OR '1'='1"}
# Testezi SQL Injection direct din Burp
\`\`\`

**Repeater — testarea manuală**

Repeater permite trimiterea aceleiași cereri de multiple ori cu modificări:

\`\`\`
Workflow tipic cu Repeater:
1. Interceptezi o cerere in Proxy
2. Click-dreapta → "Send to Repeater"
3. In Repeater: modifici parametri, headers, body
4. Trimiti si compari raspunsurile

Folosire: testare manuala a unui endpoint:
- Modifica parametrul 'id' de la 1 la 2, 3, ... (IDOR test)
- Adauga ' sau " la sfarsitul string-urilor (SQL injection test)
- Schimba 'role=user' cu 'role=admin' (privilege escalation test)
- Modifica JWT token si vezi daca serverul il accepta
\`\`\`

**Intruder — atacuri automate**

Intruder automatizează trimiterea de cereri cu liste de payload-uri:

\`\`\`
Tipuri de atac Intruder:

Sniper (cel mai comun):
→ Un singur parametru, lista de payload-uri
→ Exemplu: brute-force parola unui user cunoscut
   POST /login: username=admin&password=§§
   Payload list: [password1, password123, admin123, ...]

Cluster Bomb:
→ Multiple parametri, combinatii din multiple liste
→ Exemplu: brute-force username + parola simultan
   username=§§&password=§§
   List1: [admin, root, user] × List2: [pass, 1234, admin]

Pitchfork:
→ Multiple parametri, una la una din liste paralele
→ Exemplu: test cu perechi username/parola cunoscute
\`\`\`

**Scanner — detectare automata vulnerabilitati (Pro)**

\`\`\`
Burp Scanner (disponibil in Pro edition):
├── Crawl: descopera automat toate URL-urile/endpoint-urile
├── Audit: testare automata pentru:
│   ├── SQL Injection (inclusiv blind/time-based)
│   ├── XSS (reflected, stored, DOM-based)
│   ├── SSRF, XXE, Path Traversal
│   ├── Open Redirect
│   └── Sute de alte vulnerabilitati
└── Raport: exportabil in HTML/XML pentru clienti

Alternativa gratuita: OWASP ZAP (Zed Attack Proxy)
→ Similar cu Burp dar open-source si gratuit
→ Util pentru CI/CD integration si organizatii cu budget limitat
\`\`\`

**Workflow complet de testare a unei aplicatii**

\`\`\`
1. RECONNAISSANCE (Recunoastere)
   - Mapeaza toate endpoint-urile cu Spider/Crawler
   - Identifica tehnologii (Wappalyzer, HTTP headers)
   - Cauta fisiere sensibile: /robots.txt, /.git, /backup, /phpinfo.php

2. AUTHENTICATION TESTING
   - Brute force protection (rate limiting?)
   - Lockout policy dupa N incercari
   - Reset parola sigur? Token unic si cu expirare?
   - Session management: cookie flags, session fixation

3. AUTHORIZATION TESTING (IDOR)
   - Logheaza-te ca user A, obtine resursa lui (ex: /api/orders/123)
   - Logheaza-te ca user B, incearca sa accesezi /api/orders/123
   - Modifica parametrii de rol (user→admin, isAdmin=false→true)

4. INPUT VALIDATION
   - SQL injection: ' " -- ; OR 1=1
   - XSS: <script>alert(1)</script>, "><img src=x onerror=alert(1)>
   - Path traversal: ../../etc/passwd
   - Command injection: ; ls, | id

5. REPORTING
   - Documenteaza fiecare finding: severitate, PoC, remediere recomandata
   - Screenshot/video evidence
   - CVSS score pentru fiecare vulnerabilitate
\`\`\`

**Greșeli comune**

• **Testare fără autorizare explicită** — pentest-ul fara acordul scris al proprietarului este ILEGAL; obtine un "Rules of Engagement" document inainte de orice test
• **Testare directă în producție** — foloseste intotdeauna un mediu de testare dedicat; un atac de brute-force in productie poate loca conturi reale de utilizatori
• **Uitarea de a opri interceptarea** — dacă lași Proxy → Intercept ON și pleci, traficul browserului tău va fi blocat; dezactiveaza Intercept cand nu testezi activ`,
  },
  {
    id: "6a0b52851419ceefc024537b",
    title: "Disk Imaging si File System Forensics",
    content: `**Digital Forensics** (criminalistică digitală) este procesul de colectare, prezervare și analiză a evidențelor digitale, astfel încât acestea să fie admisibile în instanță sau utilizabile în investigații interne. **Disk Imaging** și **File System Forensics** sunt tehnicile fundamentale.

**Principiile forensicii digitale**

Înainte de orice acțiune forensică, trei principii fundamentale:

\`\`\`
1. Prezervare: nu modifica niciodată evidenta originala
   → Lucreaza MEREU pe o copie (imagine), nu pe discul original
   → Orice acces la discul original schimba timestamp-urile (atime)

2. Integritate: dovedeste ca copia e identica cu originalul
   → Hash MD5/SHA256 inainte si dupa copiere
   → Daca hash-urile nu coincid, imaginea e compromisa ca evidenta

3. Chain of Custody: documenteaza cine a atins evidenta si cand
   → Log complet: cine, ce, cand, unde
   → Fara CoC, evidenta poate fi contestata in instanta
\`\`\`

**Disk Imaging cu dd și dcfldd**

\`\`\`bash
# Verifica discul sursa INAINTE de imaging
lsblk -f                          # listeaza discuri si partitii
fdisk -l /dev/sdb                 # detalii despre discul suspect

# Hash sursa inainte de copiere
sha256sum /dev/sdb > sursa_hash.txt
# sau hash calculat on-the-fly in timpul copierii

# dd: imaginea clasica (lenta, fara progress bar)
dd if=/dev/sdb of=/evidence/disk.img bs=4M conv=noerror,sync
# if = input file (discul original)
# of = output file (imaginea)
# bs = block size (4MB e optim)
# conv=noerror: continua la erori de citire (bad sectors)
# conv=sync: umple bad sectors cu zero (pastreaza offseturile corecte)

# dcfldd: varianta forensica a dd (cu hashing automat si progress)
dcfldd if=/dev/sdb of=/evidence/disk.img \
    hash=sha256 \
    hashlog=/evidence/disk.sha256 \
    bs=4M \
    conv=noerror,sync \
    statusinterval=100

# Verificare integritate dupa copiere
sha256sum /evidence/disk.img
cat /evidence/disk.sha256  # trebuie sa coincida cu hash-ul sursei
\`\`\`

**Montarea imaginii forensice (read-only)**

\`\`\`bash
# Monteaza imaginea in modul read-only (nu modifica nimic)
sudo mount -o ro,loop,noatime /evidence/disk.img /mnt/forensic

# Pentru partitii specifice in imagine (daca e un intreg disc)
sudo losetup -f /evidence/disk.img  # gaseste /dev/loop0
sudo partprobe /dev/loop0           # detecteaza partitii
sudo mount -o ro,noatime /dev/loop0p1 /mnt/forensic_part1

# Write blocker software (alternativa la hardware write blocker)
sudo hdparm -r 1 /dev/sdb  # seteaza read-only la nivel kernel
\`\`\`

**Analiza File System cu Autopsy / The Sleuth Kit**

\`\`\`bash
# The Sleuth Kit (TSK) — command line forensics tools

# Listeaza fisiere sterse (recuperabile)
fls -rd /evidence/disk.img | grep -i "d/"  # d/ = deleted files

# Recupereaza un fisier sters dupa inode number
icat /evidence/disk.img INODE_NUMBER > /evidence/recovered_file

# Analiza timeline: toate actiunile pe filesystem cu timestamps
fls -rlm / /evidence/disk.img > body_file.txt
mactime -b body_file.txt -d > timeline.csv
# Genereaza CSV cu toate crearile, modificarile, accesarile de fisiere

# Cautare pattern in imagine (keyword search)
strings /evidence/disk.img | grep -i "password\|secret\|api_key" > strings_output.txt

# Carving: recuperare fisiere din spatiu nealucat dupa semnatura magic bytes
photorec /evidence/disk.img  # recupereaza imagini, documente, etc.
\`\`\`

**Autopsy — interfata grafica pentru forensics**

\`\`\`
Workflow in Autopsy:
1. New Case → adauga imaginea ca Data Source
2. Run Ingest Modules:
   ├── Recent Activity (browsing history, downloads)
   ├── Hash Lookup (virustotal, known malware hashes)
   ├── Keyword Search (cuvinte cheie specifice investigatiei)
   ├── Email Parser (PST, Mbox)
   └── Exif Metadata (GPS din poze, data crearii)
3. Analiza Timeline:
   └── Vizualizeaza activitatea in ordine cronologica — crucial
4. Generate Report:
   └── HTML/Excel — exportabil pentru prezentare in instanta
\`\`\`

**Analiza memoriei RAM (Memory Forensics)**

\`\`\`bash
# Captureaza memoria RAM (pe sistem live, INAINTE de oprire)
# Oprirea sistemului sterge RAM — pierdere irecuperabila de evidenta!

# Linux: LiME (Linux Memory Extractor)
insmod lime.ko "path=/evidence/ram.dump format=lime"

# Windows: WinPmem, Magnet RAM Capture, DumpIt

# Analiza cu Volatility3 (Python)
# Listeaza procesele la momentul capturii
python3 vol.py -f ram.dump windows.pslist

# Conexiuni de retea active
python3 vol.py -f ram.dump windows.netstat

# Cauta parole si chei de criptare in memorie
python3 vol.py -f ram.dump windows.hashdump     # NTLM hashes
python3 vol.py -f ram.dump windows.lsadump      # LSA secrets
python3 vol.py -f ram.dump windows.malfind      # cod injectat in procese
\`\`\`

**Greșeli comune**

• **Lucrul direct pe discul original** — orice scriere (inclusiv mounting implicit) distruge evidența sau o face inadmisibilă; folosește MEREU write blocker hardware sau software și lucrează pe imagini
• **Omiterea hash-ului înainte de copiere** — fără hash pre-imaging nu poți dovedi că imaginea e identică cu originalul; poate fi contestată ca alterată
• **Ignorarea RAM-ului** — memoria volatilă conține procese active, conexiuni, parole în plaintext, chei de criptare; capturarea RAM înainte de orice altă acțiune poate fi decisivă`,
  },
];

async function main() {
  console.log(`Updating ${updates.length} Cybersecurity sections with manual 10/10 content...`);
  for (const u of updates) {
    await p.theory.update({
      where: { id: u.id },
      data: { content: u.content },
    });
    console.log(`✓ ${u.title} — ${u.content.length} chars`);
  }
  await p.$disconnect();
  console.log("Done.");
}
main().catch(console.error);
