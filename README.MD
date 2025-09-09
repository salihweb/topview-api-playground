# Topview API Playground

Bu proje Topview AI API'lerini test etmek için oluşturulmuştur.

## Dosyalar

### 1. `index.js` - Dosya Upload
- Dosya yükleme işlemi
- Upload credentials alma
- Dosya durumu kontrol etme

### 2. `avatar-marketing-video.js` - Avatar Marketing Video Task Submit
- [Topview API Dokümantasyonu](https://s.apifox.cn/115a0d85-28a5-479d-8b8b-83d7898a7246/api-273646907) referans alınarak oluşturuldu
- Avatar marketing video task'ı submit etme
- Ürün bilgileri, video ayarları, ses ve avatar seçenekleri

### 3. `query-task.js` - Task Durumu Sorgulama
- Submit edilen task'ların durumunu sorgulama
- Progress, result URL ve hata bilgilerini görme

## Kurulum

```bash
npm install
```

## Environment Variables

`.env` dosyası oluşturun:

```env
TOPVIEW_API_KEY=your_api_key_here
TOPVIEW_UID=your_uid_here
```

## Kullanım

### 1. Dosya Upload
```bash
node index.js
```

### 2. Avatar Marketing Video Task Submit
```bash
node avatar-marketing-video.js
```

### 3. Task Durumu Sorgulama
```bash
# query-task.js dosyasında task ID'yi güncelleyin
node query-task.js
```

### 4. Export (Video dışa aktarım)
- API: [/v1/m2v/export](https://s.apifox.cn/115a0d85-28a5-479d-8b8b-83d7898a7246/api-273646909)
- Kullanım:
```bash
# Sadece taskId ile (scriptId/noticeUrl opsiyonel)
node export-task.js <taskId>

# taskId + scriptId
node export-task.js <taskId> <scriptId>

# taskId + scriptId + noticeUrl
node export-task.js <taskId> <scriptId> "https://example.com/notice"
```

Ayrıca `TOPVIEW_TASK_ID` environment değişkenini ayarlarsanız, komutu sadece `node export-task.js` şeklinde çalıştırabilirsiniz.

## API Endpoints

- **Upload**: `/v1/upload/credential`, `/v1/upload/check`
- **Avatar Marketing Video**: `/v1/m2v/task/submit`, `/v1/m2v/task/query`

## Özellikler

- ✅ Detaylı log mesajları
- ✅ Hata yönetimi
- ✅ Türkçe dil desteği
- ✅ Modüler yapı
- ✅ Environment variable desteği
