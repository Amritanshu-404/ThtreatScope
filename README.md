# ThreatScope 🔍🛡️

A lightweight, self-hosted threat intelligence platform that scans documents for suspicious keywords, visualizes threat data in real time, and generates actionable security reports—all without uploading your logs to the cloud.

---

![ThreatScope Demo](https://github.com/Amritanshu-404/ThtreatScope/blob/main/Assets/Screenshot%202025-07-02%20153119.png?raw=true)

---

## 🚀 Key Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="150">
        <img src="https://raw.githubusercontent.com/Amritanshu-404/ThtreatScope/main/assets/icons/dashboard.png" alt="Dashboard" width="64"/>
        <h4>Centralized Dashboard</h4>
        Intuitive UI displaying live threat alerts, scan summaries, and historical trends.
      </td>
      <td align="center" width="150">
        <img src="https://raw.githubusercontent.com/Amritanshu-404/ThtreatScope/main/assets/icons/nolog.png" alt="No Log Download" width="64"/>
        <h4>No Log Upload</h4>
        All processing happens locally—your data never leaves your device.
      </td>
      <td align="center" width="150">
        <img src="https://raw.githubusercontent.com/Amritanshu-404/ThtreatScope/main/assets/icons/report.png" alt="Report" width="64"/>
        <h4>Automated Reports</h4>
        Generate detailed, customizable PDFs highlighting identified risks and recommendations.
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Amritanshu-404/ThtreatScope/main/assets/icons/auto.png" alt="Autonomous" width="64"/>
        <h4>Autonomous Scanning</h4>
        Schedule recurring scans and let the system detect threats without manual intervention.
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Amritanshu-404/ThtreatScope/main/assets/icons/vuln.png" alt="Vulnerability Tracking" width="64"/>
        <h4>Live Vulnerability Feeds</h4>
        Stay up-to-date with the latest CVEs and threat intelligence feeds.
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Amritanshu-404/ThtreatScope/main/assets/icons/ux.png" alt="UX" width="64"/>
        <h4>Responsive UX</h4>
        Built with modern web technologies for a smooth experience on desktop and mobile.
      </td>
    </tr>
  </table>
</div>

---

## 🔍 How It Works

1. **Keyword Definition**  
   Define a list of suspicious or threat-related keywords (e.g., “ransomware,” “data leak,” “SQLi”) in `config/keywords.json`.  
2. **Document Ingestion**  
   Upload or drop documents (PDF, TXT, DOCX) into the scan interface.  
3. **Local Analysis**  
   The Node.js backend uses fast text-matching algorithms to detect keywords.  
4. **Visualization & Reporting**  
   Results are plotted live in the front end and can be exported as a PDF report.

---

## 🛠️ Technology Stack

- **Tooling:** Vite, Tailwind CSS  
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Reporting:** html-pdf / Puppeteer

---

## 🏗️ Project Structure

