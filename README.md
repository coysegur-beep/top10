# Atlas — Sitio web Atenas Seguridad Privada Ltda.

Sitio web corporativo + blog de noticias para Atenas Seguridad Privada Ltda. Construido con **Astro 5**, **Tailwind 4**, **Decap CMS** y desplegado en **AWS S3 + CloudFront**.

---

## 📁 Estructura del proyecto

```
atlas/
├── src/
│   ├── pages/                    # Cada archivo .astro = una URL
│   │   ├── index.astro           # Home
│   │   ├── noticias/
│   │   │   ├── index.astro       # Listado del blog
│   │   │   └── [slug].astro      # Página dinámica de cada noticia
│   │   └── rss.xml.js            # RSS feed automático
│   ├── content/
│   │   ├── config.ts             # Schemas de las colecciones
│   │   ├── noticias/             # 📝 Aquí viven las notas (.md)
│   │   └── servicios/            # 📝 Aquí viven los servicios (.md)
│   ├── layouts/
│   │   └── BaseLayout.astro      # SEO completo + schemas + meta tags
│   ├── components/               # Header, Footer, TopBar, etc.
│   ├── lib/
│   │   └── config.ts             # ⚙️ Datos del negocio (editar aquí)
│   └── styles/global.css
├── public/
│   ├── admin/                    # 🔐 Panel Decap CMS (/admin)
│   │   ├── index.html
│   │   └── config.yml
│   ├── img/                      # Imágenes estáticas
│   ├── uploads/                  # Imágenes subidas desde el panel
│   ├── robots.txt
│   └── site.webmanifest
├── .github/workflows/
│   └── deploy.yml                # CI/CD automático a AWS
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## 🚀 Inicio rápido (desarrollo local)

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo (http://localhost:4321)
npm run dev

# 3. Build de producción
npm run build

# 4. Preview del build
npm run preview
```

---

## ✏️ Cómo el cliente publica notas (panel /admin)

El cliente entra a **`https://grupoempresarialatenas.com/admin`**, inicia sesión con GitHub, y ve un panel visual donde puede:

- ✅ Crear nuevas notas
- ✅ Editar notas existentes
- ✅ Subir imágenes
- ✅ Programar publicaciones (datetime)
- ✅ Marcar como destacada
- ✅ Guardar como borrador

Cuando da click en "Publicar", Decap hace un commit a GitHub → GitHub Actions corre el build → CloudFront invalida cache → publicado en ~60-90 segundos.

### Cómo configurar la autenticación del panel

Decap necesita autenticación OAuth con GitHub. Tienes dos opciones:

**Opción A — Netlify Identity (más fácil, gratis):**
1. Crea cuenta en netlify.com
2. Crea un site nuevo (no necesitas hostear ahí, solo usar Identity)
3. Activa Identity y Git Gateway en el dashboard
4. Edita `public/admin/config.yml` y cambia `backend.name` a `git-gateway`

**Opción B — GitHub OAuth directo (sin terceros):**
1. Ve a github.com/settings/developers → "New OAuth App"
2. Authorization callback URL: `https://api.netlify.com/auth/done` (o tu propio endpoint)
3. Necesitas un OAuth provider — opciones:
   - Usar Netlify (gratis)
   - Hostear tu propio: https://github.com/vencax/netlify-cms-github-oauth-provider

**Recomendación:** empieza con Opción A. Es 10 minutos de setup y gratis.

---

## ☁️ Despliegue en AWS

### Paso 1 — Configurar recursos en AWS

#### 1.1 Crear bucket S3
```bash
aws s3api create-bucket \
  --bucket grupoempresarialatenas.com \
  --region us-east-1
```

Configurarlo como privado (sin acceso público) — el acceso lo dará CloudFront vía OAC.

#### 1.2 Solicitar certificado SSL en ACM
**Importante: en región `us-east-1` siempre** (CloudFront lo requiere).
```bash
aws acm request-certificate \
  --domain-name grupoempresarialatenas.com \
  --subject-alternative-names www.grupoempresarialatenas.com \
  --validation-method DNS \
  --region us-east-1
```
Validar con los registros CNAME que devuelve.

#### 1.3 Crear distribución CloudFront
Desde la consola AWS:
- Origin: el bucket S3 con OAC (Origin Access Control)
- Default root object: `index.html`
- Viewer protocol: Redirect HTTP to HTTPS
- Compression: Enabled (Brotli + Gzip)
- HTTP versions: HTTP/2 + HTTP/3
- SSL certificate: el ACM creado arriba
- Alternate domain names: grupoempresarialatenas.com, www.grupoempresarialatenas.com

#### 1.4 Apuntar DNS en Route 53 (o tu registrador)
Crear registros A (alias) hacia la distribución CloudFront para:
- grupoempresarialatenas.com
- www.grupoempresarialatenas.com

### Paso 2 — Configurar GitHub Actions (CI/CD)

Crear un usuario IAM con permisos limitados:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::grupoempresarialatenas.com",
        "arn:aws:s3:::grupoempresarialatenas.com/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

Generar Access Key + Secret y agregarlos como **GitHub Secrets** del repo:
- Settings → Secrets and variables → Actions → New repository secret
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID` (el ID de la distribución, formato `E1ABCDEF...`)

### Paso 3 — Push y deploy automático

```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

GitHub Actions hará el build, subirá a S3, invalidará CloudFront y notificará a Google. **En ~3 minutos el sitio está vivo.**

---

## 🔍 SEO — Pasos post-deploy

### 1. Google Search Console
1. Verificar el sitio en https://search.google.com/search-console
2. Método recomendado: subir un archivo HTML a `/public/` (ej: `google-XXXXX.html`)
3. Enviar el sitemap: `https://grupoempresarialatenas.com/sitemap-index.xml`

### 2. Bing Webmaster Tools
1. Verificar en https://www.bing.com/webmasters
2. Enviar el mismo sitemap

### 3. Google Business Profile
- Vincular al dominio `grupoempresarialatenas.com`
- Categoría primaria: "Servicio de seguridad"
- Subir fotos reales de personal/instalaciones
- Pedir reseñas activamente

### 4. Indexing API (opcional pero ALTAMENTE recomendado para noticias)
Permite que Google indexe nuevas notas en horas en vez de días:
1. Crear proyecto en Google Cloud Console
2. Habilitar "Indexing API"
3. Crear cuenta de servicio + descargar JSON
4. Agregar la cuenta de servicio como propietario en Search Console
5. Configurar un workflow adicional que llame la API por cada nota nueva

---

## 🎨 Personalización rápida

### Cambiar datos del negocio
Editar `src/lib/config.ts` — todo el sitio se actualiza automáticamente:
- Teléfono, dirección, email
- Redes sociales
- Coordenadas geográficas
- Año de fundación

### Cambiar paleta de colores
Editar `tailwind.config.mjs` — sección `colors.atenas`.

### Agregar un nuevo servicio
1. Crear archivo en `src/content/servicios/nuevo-servicio.md`
2. Agregar la entrada en `src/lib/config.ts → SERVICIOS`

---

## 📊 Stack técnico

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | Astro 5 | HTML estático = SEO máximo + Lighthouse 95-100 |
| CSS | Tailwind 4 | Utilitario, performante, mantenible |
| CMS | Decap CMS | Gratis, sin BD, panel en /admin |
| Storage de notas | GitHub (markdown) | Versionado infinito, backup automático |
| Hosting | AWS S3 | $1-3/mes, infinitamente escalable |
| CDN | AWS CloudFront | Global, HTTPS, Brotli, HTTP/3 |
| DNS | AWS Route 53 | Integración nativa con CloudFront |
| SSL | AWS ACM | Gratis, auto-renovado |
| CI/CD | GitHub Actions | Deploy automático en cada push |

**Costo total estimado: $10-15 USD/mes**

---

## 🛠️ Comandos útiles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build local |
| `npm run astro check` | Verificar tipos y errores |

---

## 🆘 Solución de problemas

**El panel /admin no carga:**
- Verificar que la autenticación OAuth está bien configurada (ver Paso de Decap arriba)
- Revisar la consola del navegador para errores específicos

**Las notas no aparecen en producción:**
- Verificar que el frontmatter tiene `draft: false`
- Verificar que GitHub Actions corrió sin errores (pestaña "Actions" del repo)
- Verificar que la invalidación de CloudFront se completó (~5 min)

**Las imágenes no cargan:**
- Las imágenes se suben a `public/uploads/` por el CMS
- En producción están en `https://grupoempresarialatenas.com/uploads/...`
- Verificar permisos del bucket S3

---

## 📞 Contacto técnico

Para soporte técnico del sitio, contactar al equipo de desarrollo.

Construido con ❤️ para Atenas Seguridad Privada Ltda.
