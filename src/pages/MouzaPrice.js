import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import '../styles/MouzaPrice.css';

const MouzaPrice = () => {
  const [selectedBhag, setSelectedBhag] = useState('');
  const [selectedJela, setSelectedJela] = useState('');

  // District data with files mapping
  const districtData = {
    'বরিশাল': {
      districts: ['বরগুনা', 'বরিশাল', 'ভোলা', 'ঝালকাঠি', 'পটুয়াখালী', 'পিরোজপুর'],
      files: {
        'বরগুনা': [
          {
            name: 'বরগুনা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1301/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'বরগুনা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1302/view',
            year: '২০২২-২৩'
          },
          {
            name: 'বরগুনা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1303/view',
            year: '২০২১-২২'
          }
        ],
        'বরিশাল': [
          {
            name: 'বরিশাল মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1304/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'বরিশাল মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1305/view',
            year: '২০২২-২৩'
          },
          {
            name: 'বরিশাল মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1306/view',
            year: '২০২১-২২'
          }
        ],
        'ভোলা': [
          {
            name: 'ভোলা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1307/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ভোলা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1308/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ভোলা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1309/view',
            year: '২০২১-২২'
          }
        ],
        'ঝালকাঠি': [
          {
            name: 'ঝালকাঠি মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1310/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ঝালকাঠি মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1311/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ঝালকাঠি মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1312/view',
            year: '২০২১-২২'
          }
        ],
        'পটুয়াখালী': [
          {
            name: 'পটুয়াখালী মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1313/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'পটুয়াখালী মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1314/view',
            year: '২০২২-২৩'
          },
          {
            name: 'পটুয়াখালী মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1315/view',
            year: '২০২১-২২'
          }
        ],
        'পিরোজপুর': [
          {
            name: 'পিরোজপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1316/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'পিরোজপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1317/view',
            year: '২০২২-২৩'
          },
          {
            name: 'পিরোজপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1318/view',
            year: '২০২১-২২'
          }
        ]
      }
    },





    
    'চট্টগ্রাম': {
      districts: ['বান্দরবান', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর', 'চট্টগ্রাম', 'কুমিল্লা', 'কক্সবাজার', 'ফেনী', 'খাগড়াছড়ি', 'লক্ষ্মীপুর', 'নোয়াখালী', 'রাঙ্গামাটি'],
      files: {
        'চান্দরবান': [
          {
            name: 'বান্দরবান মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1331/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'বান্দরবান মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1332/view',
            year: '২০২২-২৩'
          },
          {
            name: 'বান্দরবান মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1333/view',
            year: '২০২১-২২'
          }
        ],
        'ব্রাহ্মণবাড়িয়া': [
          {
            name: 'ব্রাহ্মণবাড়িয়া মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1334/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ব্রাহ্মণবাড়িয়া মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1335/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ব্রাহ্মণবাড়িয়া মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1336/view',
            year: '২০২১-২২'
          }
        ],
        'চাঁদপুর': [
          {
            name: 'চাঁদপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1337/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'চাঁদপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1338/view',
            year: '২০২২-২৩'
          },
          {
            name: 'চাঁদপুর মৌজা মূল্য তালি���া ২০২১-২২',
            url: 'https://drive.google.com/file/d/1339/view',
            year: '২০২১-২২'
          }
        ],
        'চট্টগ্রাম': [
          {
            name: 'চট্টগ্রাম মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1340/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'চট্টগ্রাম মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1341/view',
            year: '২০২২-২৩'
          },
          {
            name: 'চট্টগ্রাম মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1342/view',
            year: '২০২১-২২'
          }
        ],
        'কুমিল্লা': [
          {
            name: 'কুমিল্লা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1343/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'কুমিল্লা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1344/view',
            year: '২০২২-২৩'
          },
          {
            name: 'কুমিল্লা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1345/view',
            year: '২০২১-২২'
          }
        ],
        'কক্সবাজার': [
          {
            name: 'কক্সবাজার মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1346/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'কক্সবাজার মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1347/view',
            year: '২০২২-২৩'
          },
          {
            name: 'কক্সবাজার মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1348/view',
            year: '২০২১-২২'
          }
        ],
        'ফেনী': [
          {
            name: 'ফেনী মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1349/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ফেনী মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1350/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ফেনী মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1351/view',
            year: '২০২১-২২'
          }
        ],
        'খাগড়াছড়ি': [
          {
            name: 'খাগড়াছড়ি মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1352/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'খাগড়াছড়ি মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1353/view',
            year: '২০২২-২৩'
          },
          {
            name: 'খাগড়াছড়ি মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1354/view',
            year: '২০২১-২২'
          }
        ],
        'লক্ষ্মীপুর': [
          {
            name: 'লক্ষ্মীপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1355/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'লক্ষ্মীপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1356/view',
            year: '২০২২-২৩'
          },
          {
            name: 'লক্ষ্মীপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1357/view',
            year: '২০২১-২২'
          }
        ],
        'নোয়াখালী': [
          {
            name: 'নোয়াখালী মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1358/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'নোয়াখালী মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1359/view',
            year: '২০২২-২৩'
          },
          {
            name: 'নোয়াখালী মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1360/view',
            year: '২০২১-২২'
          }
        ],
        'রাঙ্গামাটি': [
          {
            name: 'রাঙ্গামাটি মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1361/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'রাঙ্গামাটি মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1362/view',
            year: '২০২২-২৩'
          },
          {
            name: 'রাঙ্গামাটি মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1363/view',
            year: '২০২১-২২'
          }
        ]
      }
    },
    'ঢাকা': {
      districts: ['ঢাকা', 'ফরিদপুর', 'গাজীপুর', 'গোপালগঞ্জ', 'কিশোরগঞ্জ', 'মাদারীপুর', 'মানিকগঞ্জ', 'মুন্সিগঞ্জ', 'নারায়ণগঞ্জ', 'নরসিংদী', 'রাজবাড়ী', 'শরীয়তপুর', 'টাঙ্গাইল'],
      files: {
        'ঢাকা': [
          {
            name: 'ঢাকা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1401/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ঢাকা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1402/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ঢাকা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1403/view',
            year: '২০২১-২২'
          }
        ],
        'ফরিদপুর': [
          {
            name: 'ফরিদপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1404/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ফরিদপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1405/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ফরিদপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1406/view',
            year: '২০২১-২২'
          }
        ],
        'গাজীপুর': [
          {
            name: 'গাজীপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1407/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'গাজীপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1408/view',
            year: '২০২২-২৩'
          },
          {
            name: 'গাজীপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1409/view',
            year: '২০২১-২২'
          }
        ],
        'গোপালগঞ্জ': [
          {
            name: 'গোপালগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1410/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'গোপালগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1411/view',
            year: '২০২২-২৩'
          },
          {
            name: 'গোপালগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1412/view',
            year: '২০২১-২২'
          }
        ],
        'কিশোরগঞ্জ': [
          {
            name: 'কিশোরগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1413/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'কিশোরগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1414/view',
            year: '২০২২-২৩'
          },
          {
            name: 'কিশোরগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1415/view',
            year: '২০২১-২��'
          }
        ],
        'মাদারীপুর': [
          {
            name: 'মাদারীপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1416/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'মাদারীপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1417/view',
            year: '২০২২-২৩'
          },
          {
            name: 'মাদারীপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1418/view',
            year: '২০২১-২২'
          }
        ],
        'মানিকগঞ্জ': [
          {
            name: 'মানিকগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1419/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'মানিকগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1420/view',
            year: '২০২২-২৩'
          },
          {
            name: 'মানিকগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1421/view',
            year: '২০২১-২২'
          }
        ],
        'মুন্সিগঞ্জ': [
          {
            name: 'মুন্সিগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1422/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'মুন্সিগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1423/view',
            year: '২০২২-২৩'
          },
          {
            name: 'মুন্সিগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1424/view',
            year: '২০২১-২২'
          }
        ],
        'নারায়ণগঞ্জ': [
          {
            name: 'নারায়ণগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1425/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'নারায়ণগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1426/view',
            year: '২০২২-২৩'
          },
          {
            name: 'নারায়ণগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1427/view',
            year: '২০২১-২২'
          }
        ],
        'নরসিংদী': [
          {
            name: 'নরসিংদী মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1428/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'নরসিংদী মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1429/view',
            year: '২০২২-২৩'
          },
          {
            name: 'নরসিংদী মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1430/view',
            year: '২০২১-২২'
          }
        ],
        'রাজবাড়ী': [
          {
            name: 'রাজবাড়ী মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1431/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'রাজবাড়ী মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1432/view',
            year: '২০২২-২৩'
          },
          {
            name: 'রাজবাড়ী মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1433/view',
            year: '২০২১-২২'
          }
        ],
        'শরীয়তপুর': [
          {
            name: 'শরীয়তপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1434/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'শরীয়তপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1435/view',
            year: '২০২২-২৩'
          },
          {
            name: 'শরীয়তপুর মৌজা মূল্য তালিকা ২০২��-২২',
            url: 'https://drive.google.com/file/d/1436/view',
            year: '২০২১-২২'
          }
        ],
        'টাঙ্গাইল': [
          {
            name: 'টাঙ্গাইল মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1437/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'টাঙ্গাইল মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1438/view',
            year: '২০২২-২৩'
          },
          {
            name: 'টাঙ্গাইল মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1439/view',
            year: '২০২১-২২'
          }
        ]
      }
    },
    'খুলনা': {
      districts: ['বাগেরহাট', 'চুয়াডাঙ্গা', 'যশোর', 'ঝিনাইদহ', 'খুলনা', 'কুষ্টিয়া', 'মাগুরা', 'মেহেরপুর', 'নড়াইল', 'সাতক্ষীরা'],
      files: {
        'বাগেরহাট': [
          {
            name: 'বাগেরহাট মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1440/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'বাগেরহাট মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1441/view',
            year: '২০২২-২৩'
          },
          {
            name: 'বাগেরহাট মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1442/view',
            year: '২০২১-২২'
          }
        ],
        'চুয়াডাঙ্গা': [
          {
            name: 'চুয়াডাঙ্গা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1443/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'চুয়াডাঙ্গা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1444/view',
            year: '২০২২-২৩'
          },
          {
            name: 'চুয়াডাঙ্গা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1445/view',
            year: '২০২১-২২'
          }
        ],
        'যশোর': [
          {
            name: 'যশোর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1446/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'যশোর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1447/view',
            year: '২০২২-২৩'
          },
          {
            name: 'যশোর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1448/view',
            year: '২০২১-২২'
          }
        ],
        'ঝিনাইদহ': [
          {
            name: 'ঝিনাইদহ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1449/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ঝিনাইদহ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1450/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ঝিনাইদহ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1451/view',
            year: '২০২১-২২'
          }
        ],
        'খুলনা': [
          {
            name: 'খুলনা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1452/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'খুলনা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1453/view',
            year: '২০২২-২৩'
          },
          {
            name: 'খুলনা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1454/view',
            year: '২০২১-২২'
          }
        ],
        'কুষ্টিয়া': [
          {
            name: 'কুষ্টিয়া মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1455/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'কুষ্টিয়া মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1456/view',
            year: '২০২২-২৩'
          },
          {
            name: 'কুষ্টিয়া মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1457/view',
            year: '২০২১-২২'
          }
        ],
        'মাগুরা': [
          {
            name: 'মাগুরা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1458/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'মাগুরা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1459/view',
            year: '২০২২-২৩'
          },
          {
            name: 'মাগুরা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1460/view',
            year: '২০২১-২২'
          }
        ],
        'মেহেরপুর': [
          {
            name: 'মেহেরপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1461/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'মেহেরপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1462/view',
            year: '২০২২-২৩'
          },
          {
            name: 'মেহেরপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1463/view',
            year: '২০২১-২২'
          }
        ],
        'নড়াইল': [
          {
            name: 'নড়াইল মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1464/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'নড়াইল মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1465/view',
            year: '২০২২-২৩'
          },
          {
            name: 'নড়াইল মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1466/view',
            year: '��০২১-২��'
          }
        ],
        'সাতক্ষীরা': [
          {
            name: 'সাতক্ষীরা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1467/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'সাতক্ষীরা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1468/view',
            year: '২০২২-২৩'
          },
          {
            name: 'সাতক্ষীরা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1469/view',
            year: '২০২১-২২'
          }
        ]
      }
    },
    'ময়মনসিংহ': {
      districts: ['জামালপুর', 'ময়মনসিংহ', 'নেত্রকোণা', 'শেরপুর'],
      files: {
        'জামালপুর': [
          {
            name: 'জামালপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1470/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'জামালপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1471/view',
            year: '২০২২-২৩'
          },
          {
            name: 'জামালপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1472/view',
            year: '২০২১-২২'
          }
        ],
        'ময়মনসিংহ': [
          {
            name: 'ময়মনসিংহ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1473/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ময়মনসিংহ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1474/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ময়মনসিংহ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1475/view',
            year: '২০২১-২২'
          }
        ],
        'নেত্রকোণা': [
          {
            name: 'ন��ত্রকোণা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1476/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'নেত্রকোণা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1477/view',
            year: '২০২২-২৩'
          },
          {
            name: 'নেত্রকোণা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1478/view',
            year: '২০২১-২২'
          }
        ],
        'শেরপুর': [
          {
            name: 'শেরপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1479/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'শেরপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1480/view',
            year: '২০২২-২৩'
          },
          {
            name: 'শেরপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1481/view',
            year: '২০২১-২২'
          }
        ]
      }
    },
    'রাজশাহী': {
      districts: ['বগুড়া', 'জয়পুরহাট', 'নওগাঁ', 'নাটোর', 'চাঁপাইনবাবগঞ্জ', 'পাবনা', 'রাজশাহী', 'সিরাজগঞ্জ'],
      files: {
        'বগুড়া': [
          {
            name: 'বগুড়া মদর',
            url: 'https://drive.google.com/file/d/1bP-bpJF3YY_nRpe7MGniFs093JJJRB9m/view?usp=drive_link',
            upozila: 'সদর'
          },
          {
            name: 'আদমদিঘি',
            url: 'https://drive.google.com/file/d/1b2Qj11N8XgIl10_WmJQbCN6qB_uKnVer/view?usp=sharing',
            upozila: 'আদমদিঘি'
          },
          {
            name: 'দুপচাঁচিয়া',
            url: 'https://drive.google.com/file/d/1bEgsyTueStyYIazStl25aOJxeNRrU7mc/view?usp=drive_link',
            upozila: 'দুপচাঁচিয়া'
          },
          {
            name: 'গাবতলী',
            url: 'https://drive.google.com/file/d/1bFdIPXBLSirL1FJGg7-QJGi-gJDAX14v/view?usp=drive_link',
            upozila: 'গাবতলী'
          },
          {
            name: 'কাহালু',
            url: 'https://drive.google.com/file/d/1bICkxd9Pmwh7bcAtus5cP3bqPL6D8MM4/view?usp=drive_link',
            upozila: 'কাহালু'
          },
          {
            name: 'নন্দিগ্রাম',
            url: 'https://drive.google.com/file/d/1bG_cToq_T97b3xPJ1ryiCpW5NfVKfBwP/view?usp=drive_link',
            upozila: 'নন্দিগ্রাম'
          },
          {
            name: 'শাজাহানপুর',
            url: 'https://drive.google.com/file/d/1bV0rJkIihqcVhG3YnoYQSof7upH03DJO/view?usp=drive_link',
            upozila: 'শাজাহানপুর'
          },
          {
            name: 'শেরপুর',
            url: 'https://drive.google.com/file/d/1bVcH9IW7WbSmpk-MViaEKbQY24MmM2iM/view?usp=drive_link',
            upozila: 'শেরপুর'
          },
          {
            name: 'শিবগঞ্জ',
            url: 'https://drive.google.com/file/d/1bXIYu_ylyVowzpNn5TtM-7OkTnZqlCJM/view?usp=drive_link',
            upozila: 'শিবগঞ্জ'
          },
          {
            name: 'সারিয়াকান্দি',
            url: 'https://drive.google.com/file/d/1bJ7BsLQQckw9kmJrImxbwhKd-RFPcWgD/view?usp=drive_link',
            upozila: 'সারিয়াকান্দি'
          },
          {
            name: 'সোনাতলা',
            url: 'https://drive.google.com/file/d/1bVu-MqMT52jqqhQ6xCSP3U37Ye6MSHum/view?usp=drive_link',
            upozila: 'সোনাতলা'
          },
          {
            name: 'ধুনট',
            url: 'https://drive.google.com/file/d/1bD8RLKNwb-CXTxMKF3_zJjSKwferzqzG/view?usp=drive_link',
            upozila: 'ধুনট'
          }
        ],
        'জয়পুরহাট': [
          {
            name: 'জয়পুরহাট  সদর',
            url: 'https://drive.google.com/file/d/1XAA_d7D3XjC2Pjqotzu2vpFtwGs1Xocd/view?usp=drive_link',
            upozila: 'সদর'
          },
          {
            name: 'আক্কেলপুর',
            url: 'https://drive.google.com/file/d/1z33iJmf8e8P9JTO0DE3gWmBhupETFEp7/view?usp=drive_link',
            upozila: 'আক্কেলপুর'
          },
          {
            name: 'কালাই',
            url: 'https://drive.google.com/file/d/1LpOy8oPwUe4fURhnYB1SzEElzJCW5jN1/view?usp=sharing',
            upozila: 'কালাই'
          },
          {
            name: 'ক্ষেতলাল',
            url: 'https://drive.google.com/file/d/1AciE3lZcZnElieozXL0t1asQpkdC2zDm/view?usp=drive_link',
            upozila: 'ক্ষেতলাল'
          },
          {
            name: 'পাঁচবিবি',
            url: 'https://drive.google.com/file/d/1lb17lCLqiICioUOgN8t_11NLKNsSA_hc/view?usp=drive_link',
            upozila: 'পাঁচবিবি'
          }
        ],
        'নওগাঁ': [
          {
            name: 'নওগাঁ মদর',
            url: 'https://drive.google.com/file/d/1b0FyJ2fmqvZZW8um5oqVTipIpF_wUJHv/view?usp=drive_link',
            upozila: 'সদর'
          },
          {
            name: 'আত্রাই',
            url: 'https://drive.google.com/file/d/1asys4X2i0ELqPpo9iV9bbSB6eX6fcAab/view?usp=drive_link',
            upozila: 'আত্রাই'
          },
          {
            name: 'বদলগাছী',
            url: 'https://drive.google.com/file/d/1aVXtllHjbmi6vQX9hXXQXOt0cF-NJ9Df/view?usp=drive_link',
            upozila: 'বদলগাছী'
          },
          {
            name: 'ধামইরহাট',
            url: 'https://drive.google.com/file/d/1aV7AnM4C_EegRk81dPTGHi2zQM-zM5Wh/view?usp=drive_link',
            upozila: 'ধামইরহাট'
          },
          {
            name: 'মহাদেবপুর',
            url: 'https://drive.google.com/file/d/1b0_udFGiACLMOIXVH9mYBu5aiYcRHrEl/view?usp=drive_link',
            upozila: 'মহাদেবপুর'
          },
          {
            name: 'মান্দা',
            url: 'https://drive.google.com/file/d/1aaKwl7YflzmghGPvWH1lYGmaPb2PwGm1/view?usp=drive_link',
            upozila: 'মান্দা'
          },
          {
            name: 'নিয়ামতপুর',
            url: 'https://drive.google.com/file/d/1ayLuoP8diP67HNVjh63bqguIpvue_fLO/view?usp=drive_link',
            upozila: 'নিয়ামতপুর'
          },
          {
            name: 'পত্নীতলা',
            url: 'https://drive.google.com/file/d/1aahR_-syspLwZ1Xpve6vtNAVgD0Dovfd/view?usp=drive_link',
            upozila: 'পত্নীতলা'
          },
          {
            name: 'পোরশা',
            url: 'https://drive.google.com/file/d/1aWnMrluSOgHkTDTHGXOOs2xUAoUSzFeJ/view?usp=drive_link',
            upozila: 'পোরশা'
          },
          {
            name: 'রাণীনগর',
            url: 'https://drive.google.com/file/d/1ah-YmL-C_B5tX3E4F65iwzYssu3HMoyS/view?usp=drive_link',
            upozila: 'রাণীনগর'
          },
          {
            name: 'সাপাহার',
            url: 'https://drive.google.com/file/d/1b-JwiJZiXKMb5wp7X27z-4z0M8Bs0hs1/view?usp=drive_link',
            upozila: 'সাপাহার'
          }
        ],
        'নাটোর': [
          {
            name: 'নাটোর মদর',  // Fixed from 'নাটোর মদর'
            url: 'https://drive.google.com/file/d/1bfxv5Y59PVK7OT9DjWLq3TZUpw89lk6q/view?usp=drive_link',
            upozila: 'সদর'
          },
          {
            name: 'বড়াইগ্রাম',
            url: 'https://drive.google.com/file/d/1bwUz95ocIfGRjAcApCDfMtWPiV2_9jlt/view?usp=drive_link',
            upozila: 'বড়াইগ্রাম'
          },
          {
            name: 'বাগাতিপাড়া',
            url: 'https://drive.google.com/file/d/1bxKSAORjVvmGpOi9lB09Mi1_8XHdEmry/view?usp=drive_link',
            upozila: 'বাগাতিপাড়া'
          },
          {
            name: 'লালপুর',
            url: 'https://drive.google.com/file/d/1blR_4bsg4xb2e9cf_hEJNwsCEg1KJkM6/view?usp=drive_link',
            upozila: 'লালপুর'
          },
          // Removed duplicate 'নাটোর' entry since it's redundant with 'নাটোর সদর'
          {
            name: 'সিংড়া',
            url: 'https://drive.google.com/file/d/1bgYjBAutAqHVoMaDYMuqMUzx8WBz4Erz/view?usp=drive_link',
            upozila: 'সিংড়া'
          },
          {
            name: 'গুরুদাসপুর',
            url: 'https://drive.google.com/file/d/1bdpuhDpSQc6uD9yiNtaD3q-f6xPF9Et2/view?usp=drive_link',
            upozila: 'গুরুদাসপুর'
          }
          // Removed 'নলডাঙ্গা' as it's not an upazila of Natore
        ],
        'চাঁপাইনবাবগঞ্জ': [
          {
            name: 'চাঁপাইনবাবগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1494/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'চাঁপাইনবাবগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1495/view',
            year: '২০২২-২৩'
          },
          {
            name: 'চাঁপাইনবাবগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1496/view',
            year: '২০২১-২২'
          }
        ],
        'পাবনা': [
          {
            name: 'পাবনা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1497/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'পাবনা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1498/view',
            year: '২০২২-২৩'
          },
          {
            name: 'পাবনা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1499/view',
            year: '২০২১-২২'
          }
        ],
        'রাজশাহী': [
          {
            name: 'রাজশাহী মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1500/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'রাজশাহী মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1501/view',
            year: '২০২২-২৩'
          },
          {
            name: 'রাজশাহী মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1502/view',
            year: '২০২১-২২'
          }
        ],
        'সিরাজগঞ্জ': [
          {
            name: 'সিরাজগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1503/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'সিরাজগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1504/view',
            year: '২০২২-২৩'
          },
          {
            name: 'সিরাজগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1505/view',
            year: '২০২১-২২'
          }
        ]
      }
    },
    'রংপুর': {
      districts: ['দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম', 'লালমনিরহাট', 'নীলফামারী', 'পঞ্চগড়', 'রংপুর', 'ঠাকুরগাঁও'],
      files: {
        'দিনাজপুর': [
          {
            name: 'দিনাজপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1506/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'দিনাজপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1507/view',
            year: '২০২২-২৩'
          },
          {
            name: 'দিনাজপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1508/view',
            year: '২০২১-২২'
          }
        ],
        'গাইবান্ধা': [
          {
            name: 'গাইবান্ধা মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1509/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'গাইবান্ধা মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1510/view',
            year: '২০২২-২৩'
          },
          {
            name: 'গাইবান্ধা মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1511/view',
            year: '২০২১-২২'
          }
        ],
        'কুড়িগ্রাম': [
          {
            name: 'কুড়িগ্রাম মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1512/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'কুড়িগ্রাম মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1513/view',
            year: '২০২২-২৩'
          },
          {
            name: 'কুড়িগ্রাম মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1514/view',
            year: '২০২১-২২'
          }
        ],
        'লালমনিরহাট': [
          {
            name: 'লালমনিরহাট মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1515/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'লালমনিরহাট মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1516/view',
            year: '২০২২-২৩'
          },
          {
            name: 'লালমনিরহাট মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1517/view',
            year: '২০২১-২২'
          }
        ],
        'নীলফামারী': [
          {
            name: 'নীলফামারী মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1518/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'নীলফামারী মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1519/view',
            year: '২০২২-২৩'
          },
          {
            name: 'নীলফামারী মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1520/view',
            year: '২০২১-২২'
          }
        ],
        'পঞ্চগড়': [
          {
            name: 'পঞ্চগড় মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1521/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'পঞ্চগড় মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1522/view',
            year: '২০২২-২৩'
          },
          {
            name: 'পঞ্চগড় মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1523/view',
            year: '২০২১-২২'
          }
        ],
        'রংপুর': [
          {
            name: 'রংপুর মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1524/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'রংপুর মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1525/view',
            year: '২০২২-২৩'
          },
          {
            name: 'রংপুর মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1526/view',
            year: '২০২১-২২'
          }
        ],
        'ঠাকুরগাঁও': [
          {
            name: 'ঠাকুরগাঁও মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1527/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'ঠাকুরগাঁও মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1528/view',
            year: '২০২২-২৩'
          },
          {
            name: 'ঠাকুরগাঁও মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1529/view',
            year: '২০২১-২২'
          }
        ]
      }
    },
    'সিলেট': {
      districts: ['হবিগঞ্জ', 'মৌলভীবাজার', 'সুনামগঞ্জ', 'সিলেট'],
      files: {
        'হবিগঞ্জ': [
          {
            name: 'হবিগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1530/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'হবিগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1531/view',
            year: '২০২২-২৩'
          },
          {
            name: 'হবিগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1532/view',
            year: '২০২১-২২'
          }
        ],
        'মৌলভীবাজার': [
          {
            name: 'মৌলভীবাজার মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1533/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'মৌলভীবাজার মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1534/view',
            year: '২০২২-২৩'
          },
          {
            name: 'মৌলভীবাজার মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1535/view',
            year: '২০২১-২২'
          }
        ],
        'সুনামগঞ্জ': [
          {
            name: 'সুনামগঞ্জ মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1536/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'সুনামগঞ্জ মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1537/view',
            year: '২০২২-২৩'
          },
          {
            name: 'সুনামগঞ্জ মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1538/view',
            year: '২০২১-২২'
          }
        ],
        'সিলেট': [
          {
            name: 'সিলেট মৌজা মূল্য তালিকা ২০২৩-২৪',
            url: 'https://drive.google.com/file/d/1539/view',
            year: '২০২৩-২৪'
          },
          {
            name: 'সিলেট মৌজা মূল্য তালিকা ২০২২-২৩',
            url: 'https://drive.google.com/file/d/1540/view',
            year: '২০২২-২৩'
          },
          {
            name: 'সিলেট মৌজা মূল্য তালিকা ২০২১-২২',
            url: 'https://drive.google.com/file/d/1541/view',
            year: '২০২১-২২'
          }
        ]
      }
    }
  };

  const handleBhagChange = (e) => {
    setSelectedBhag(e.target.value);
    setSelectedJela('');
  };

  const handleJelaChange = (e) => {
    setSelectedJela(e.target.value);
  };

  const getFilesForDistrict = () => {
    if (!selectedBhag || !selectedJela) return [];
    return districtData[selectedBhag]?.files[selectedJela] || [];
  };

  return (
    <div className="mouza-price-container">
      <h1 className="main-title">মৌজা মূল্য তালিকা</h1>
      
      <div className="selection-container">
        <div className="select-group">
          <label htmlFor="bhag-select">বিভাগ নির্বাচন করুন:</label>
          <select 
            id="bhag-select"
            value={selectedBhag}
            onChange={handleBhagChange}
            className="select-input"
          >
            <option value="">বিভাগ নির্বাচন করুন</option>
            {Object.keys(districtData).map(bhag => (
              <option key={bhag} value={bhag}>{bhag}</option>
            ))}
          </select>
        </div>

        {selectedBhag && (
          <motion.div 
            className="select-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <label htmlFor="jela-select">জেলা নির্বাচন করুন:</label>
            <select
              id="jela-select"
              value={selectedJela}
              onChange={handleJelaChange}
              className="select-input"
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {districtData[selectedBhag]?.districts.map(jela => (
                <option key={jela} value={jela}>{jela}</option>
              ))}
            </select>
          </motion.div>
        )}
      </div>

      {selectedJela && getFilesForDistrict().length > 0 && (
        <motion.div 
          className="pdf-links-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>{selectedJela} জেলার মৌজা মূল্য তালিকা</h2>
          <div className="pdf-links">
            {getFilesForDistrict().map((file, index) => (
              <motion.a
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="pdf-info">
                  <FaFilePdf className="pdf-icon" />
                  <div className="pdf-details">
                    <h3>{file.name}</h3>
                    <p className="file-year">{file.year}</p>
                  </div>
                  <FaDownload className="download-icon" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MouzaPrice; 