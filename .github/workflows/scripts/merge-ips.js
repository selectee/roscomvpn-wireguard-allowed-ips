const fs = require('fs');
const path = require('path');
const { mergeCidr } = require('cidr-tools');

async function mergeIPs() {
  try {
    // Читаем файл с IP адресами
    const inputFile = 'AllowedIPs.txt';
    if (!fs.existsSync(inputFile)) {
      console.log('Файл не найден:', inputFile);
      return;
    }

    // Парсим строку с IP адресами (через запятую)
    const content = fs.readFileSync(inputFile, 'utf8').trim();
    const ips = content.split(',').map(ip => ip.trim()).filter(ip => ip.length > 0);

    console.log(`Входящих CIDR диапазонов: ${ips.length}`);

    // Объединяем и оптимизируем диапазоны
    const merged = mergeCidr(ips);

    console.log(`Объединённых CIDR диапазонов: ${merged.length}`);

    // Сохраняем результат в новый файл
    const outputFile = 'AllowedIPs-merged.txt';
    fs.writeFileSync(outputFile, merged.join(','), 'utf8');
    
    console.log(`✓ Результат сохранён в ${outputFile}`);
    console.log(`Пример: ${merged.slice(0, 3).join(', ')}...`);

  } catch (error) {
    console.error('Ошибка при обработке IP адресов:', error.message);
    process.exit(1);
  }
}

mergeIPs();
