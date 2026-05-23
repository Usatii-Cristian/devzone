"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  // Find L35 lesson by partial title (avoid mojibake em dash)
  const lessons = await p.lesson.findMany({
    where: { module: { slug: "c" }, title: { contains: "Server HTTP" } }
  });
  if (!lessons.length) { console.log("! Lesson not found"); await p.$disconnect(); return; }

  const theory = await p.theory.findFirst({
    where: {
      lessonId: { in: lessons.map(l => l.id) },
      title: { contains: "Protocolul HTTP" }
    }
  });
  if (!theory) { console.log("! Theory not found"); await p.$disconnect(); return; }

  const content = `**HTTP/1.0** este un protocol text pe TCP. Implementarea unui server HTTP de bază demonstrează integrarea socket-urilor, parsing-ului de string-uri și I/O de fișiere.

**Formatul unei cereri HTTP:**
\`\`\`
GET /index.html HTTP/1.0\\r\\n
Host: localhost:8080\\r\\n
User-Agent: curl/7.68.0\\r\\n
\\r\\n
\`\`\`

**Formatul unui răspuns HTTP:**
\`\`\`
HTTP/1.0 200 OK\\r\\n
Content-Type: text/html\\r\\n
Content-Length: 42\\r\\n
\\r\\n
<html><body>Hello, World!</body></html>
\`\`\`

**Parsare cerere și detectare MIME type:**
\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    char method[16];   /* GET, POST, HEAD */
    char path[256];    /* /index.html */
    char version[16];  /* HTTP/1.0 */
} HttpRequest;

int parse_request(const char *raw, HttpRequest *req) {
    return sscanf(raw, "%15s %255s %15s",
                  req->method, req->path, req->version) == 3;
}

const char* mime_type(const char *path) {
    const char *ext = strrchr(path, '.');
    if (!ext) return "application/octet-stream";
    if (!strcmp(ext, ".html")) return "text/html";
    if (!strcmp(ext, ".css"))  return "text/css";
    if (!strcmp(ext, ".js"))   return "application/javascript";
    if (!strcmp(ext, ".json")) return "application/json";
    if (!strcmp(ext, ".png"))  return "image/png";
    if (!strcmp(ext, ".jpg"))  return "image/jpeg";
    return "application/octet-stream";
}
\`\`\`

**Servire fișiere statice:**
\`\`\`c
#include <sys/socket.h>
#include <stdlib.h>
#include <unistd.h>

void trimite_fisier(int fd, const char *path) {
    FILE *f = fopen(path, "rb");
    if (!f) {
        const char *err =
            "HTTP/1.0 404 Not Found\\r\\n"
            "Content-Type: text/plain\\r\\n\\r\\n"
            "404 Not Found\\n";
        send(fd, err, strlen(err), 0);
        return;
    }
    fseek(f, 0, SEEK_END); long size = ftell(f); rewind(f);

    char header[512];
    snprintf(header, sizeof(header),
             "HTTP/1.0 200 OK\\r\\n"
             "Content-Type: %s\\r\\n"
             "Content-Length: %ld\\r\\n"
             "Connection: close\\r\\n\\r\\n",
             mime_type(path), size);
    send(fd, header, strlen(header), 0);

    char buf[4096]; size_t n;
    while ((n = fread(buf, 1, sizeof(buf), f)) > 0)
        send(fd, buf, n, 0);
    fclose(f);
}

void handle_client(int fd) {
    char req_buf[8192] = {0};
    recv(fd, req_buf, sizeof(req_buf)-1, 0);

    HttpRequest req;
    if (!parse_request(req_buf, &req)) {
        const char *bad = "HTTP/1.0 400 Bad Request\\r\\n\\r\\nBad Request\\n";
        send(fd, bad, strlen(bad), 0);
        return;
    }
    char path[300];
    if (!strcmp(req.path, "/")) strcpy(path, "./index.html");
    else snprintf(path, sizeof(path), ".%s", req.path);

    trimite_fisier(fd, path);
    close(fd);
}
\`\`\`

**Main loop — accept conexiuni:**
\`\`\`c
/* Pornire server pe port 8080 */
int srv = socket(AF_INET, SOCK_STREAM, 0);
int opt = 1;
setsockopt(srv, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

struct sockaddr_in addr = {0};
addr.sin_family = AF_INET;
addr.sin_addr.s_addr = INADDR_ANY;
addr.sin_port = htons(8080);

bind(srv, (struct sockaddr*)&addr, sizeof(addr));
listen(srv, 10);
printf("Server HTTP pe http://localhost:8080\\n");

while (1) {
    int client = accept(srv, NULL, NULL);
    if (client < 0) continue;
    handle_client(client);
}
\`\`\`

**Test:**
\`\`\`bash
curl http://localhost:8080/
curl http://localhost:8080/style.css
\`\`\``;

  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log("✓ " + theory.title.substring(0, 40) + ": " + theory.content.length + " → " + content.length);
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
