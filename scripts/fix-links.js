const fs = require('fs');
const path = require('path');

// 需要处理的目录
const directories = ['news', 'tools', 'learn', 'prompts', 'community'];

// 处理每个目录中的index.html文件
directories.forEach(dir => {
    const filePath = path.join(__dirname, '..', dir, 'index.html');
    
    if (fs.existsSync(filePath)) {
        console.log(`处理文件: ${filePath}`);
        
        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 修复CSS和JS链接
        content = content.replace(/href="styles\.css"/g, 'href="../styles.css"');
        content = content.replace(/src="script\.js"/g, 'src="../script.js"');
        
        // 修复首页链接
        content = content.replace(/href="index\.html"/g, 'href="../index.html"');
        
        // 修复导航链接
        content = content.replace(/href="learn\.html/g, 'href="../learn/');
        content = content.replace(/href="tools\.html/g, 'href="../tools/');
        content = content.replace(/href="prompts\.html/g, 'href="../prompts/');
        content = content.replace(/href="community\.html/g, 'href="../community/');
        content = content.replace(/href="news\.html"/g, 'href="../news/"');
        
        // 修复锚点链接
        directories.forEach(targetDir => {
            const regex = new RegExp(`href="${targetDir}\\.html#([^"]+)"`, 'g');
            content = content.replace(regex, `href="../${targetDir}/#$1"`);
        });
        
        // 保存修改后的文件
        fs.writeFileSync(filePath, content);
        console.log(`已完成文件修复: ${filePath}`);
    } else {
        console.log(`文件不存在: ${filePath}`);
    }
});

console.log('所有链接修复完成！');