// .cz-config.js veya commitlint.config.js için uygun format
module.exports = {
  types: [
    { value: 'feat', name: '🚀 feat:      Yeni bir özellik' },
    { value: 'fix', name: '🐛 fix:       Bir hata düzeltmesi' },
    { value: 'core', name: '🔥 core:      Çekirdek değişiklikler' },
    { value: 'docs', name: '📖 docs:      Sadece dokümantasyon' },
    { value: 'style', name: '💄 style:     Kodun çalışmasını etkilemeyen görsel değişiklikler' },
    { value: 'refactor', name: '🔨 refactor:  Ne bir hata düzelten ne de özellik ekleyen kod değişikliği' },
    { value: 'perf', name: '🏎 perf:      Performansı artıran kod değişikliği' },
    { value: 'test', name: '🧪 test:      Eksik testleri ekleme veya mevcut testleri düzeltme' },
    { value: 'build', name: '📦 build:     Derleme sistemini veya dış bağımlılıkları etkileyen değişiklikler' },
    { value: 'ci', name: '🤖 ci:        CI konfigürasyon dosyalarında ve betiklerinde yapılan değişiklikler' },
    { value: 'chore', name: '⚙️ chore:     Diğer kaynak veya test dosyalarını değiştirmeyen değişiklikler' },
    { value: 'revert', name: '⏪ revert:    Önceki bir commit\'i geri al' },
    { value: 'typings', name: '🏷 types:     Tip tanımlamaları (TypeScript vb.)' }, // 'types' yerine 'typings'
    { value: 'wip', name: '🚧 wip:       Üzerinde çalışılmaya devam edilen işler' }
  ],
  // ... diğer ayarlar
};
