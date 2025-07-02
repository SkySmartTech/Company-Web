<?php 
require 'includes/auth.php'; 
require 'includes/db_connection.php';  

$sql = "SELECT * FROM job_applications ORDER BY submitted_at DESC"; 
$result = $conn->query($sql); 
?>  

<!DOCTYPE html> 
<html> 
<head>     
    <title>Admin Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            position: relative;
            overflow-x: auto;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            pointer-events: none;
            z-index: -1;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 30px;
            animation: slideIn 0.8s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
        }

        h2 {
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 2.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        h2::before {
            content: "📊";
            font-size: 2rem;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }

        .logout-btn {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .logout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
            color: white;
        }

        .stats-bar {
            background: linear-gradient(135deg,rgb(105, 170, 255),rgb(190, 120, 255));
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            margin-bottom: 25px;
            text-align: center;
            font-size: 1.1rem;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
            100% {
                transform: scale(1);
            }
        }

        .table-container {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: none;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
        }

        th {
            background-color: #667eea; /* solid color instead of gradient */
            color: white;
            padding: 20px 15px;
            text-align: left;
            font-weight: 600;
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
        }

        /* Remove the gradient underline effect */
        th::after {
            display: none;
        }


        td {
            padding: 18px 15px;
            border-bottom: 1px solid #f0f0f0;
            transition: all 0.3s ease;
            border-left: none;
            border-right: none;
        }

        tr {
            transition: all 0.3s ease;
            animation: fadeInRow 0.6s ease-out;
            animation-fill-mode: both;
        }

        tr:nth-child(1) { animation-delay: 0.1s; }
        tr:nth-child(2) { animation-delay: 0.2s; }
        tr:nth-child(3) { animation-delay: 0.3s; }
        tr:nth-child(4) { animation-delay: 0.4s; }
        tr:nth-child(5) { animation-delay: 0.5s; }

        @keyframes fadeInRow {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        tbody tr:hover {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
            transform: translateX(5px);
            box-shadow: 5px 0 15px rgba(102, 126, 234, 0.1);
        }

        .download-link {
            background: linear-gradient(135deg,rgb(1, 78, 145),rgb(122, 1, 86));
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 25px;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 3px 10px rgba(79, 172, 254, 0.3);
        }

        .download-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
            color: white;
        }

        .id-badge {
            background: linear-gradient(135deg, #a8edea, #fed6e3);
            color: #333;
            padding: 5px 10px;
            border-radius: 15px;
            font-weight: 700;
            text-align: center;
            min-width: 40px;
        }

        .job-title {
            font-weight: 600;
            color: #667eea;
        }

        .email {
            color: #666;
            font-size: 0.9rem;
        }

        .phone {
            font-family: 'Courier New', monospace;
            background: #f8f9fa;
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 0.9rem;
        }

        .date {
            font-size: 0.85rem;
            color: #888;
            font-weight: 500;
        }

        .floating-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }

        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 6s infinite linear;
        }

        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }

        @media (max-width: 768px) {
            .container {
                padding: 20px;
                margin: 10px;
            }
            
            h2 {
                font-size: 2rem;
            }
            
            .header {
                flex-direction: column;
                gap: 15px;
            }
            
            table {
                font-size: 0.85rem;
            }
            
            th, td {
                padding: 12px 8px;
            }
        }
    </style>
</head> 
<body>
    <div class="floating-particles">
        <div class="particle" style="left: 10%; width: 4px; height: 4px; animation-delay: 0s;"></div>
        <div class="particle" style="left: 20%; width: 6px; height: 6px; animation-delay: 1s;"></div>
        <div class="particle" style="left: 30%; width: 3px; height: 3px; animation-delay: 2s;"></div>
        <div class="particle" style="left: 40%; width: 5px; height: 5px; animation-delay: 3s;"></div>
        <div class="particle" style="left: 50%; width: 4px; height: 4px; animation-delay: 4s;"></div>
        <div class="particle" style="left: 60%; width: 6px; height: 6px; animation-delay: 5s;"></div>
        <div class="particle" style="left: 70%; width: 3px; height: 3px; animation-delay: 6s;"></div>
        <div class="particle" style="left: 80%; width: 5px; height: 5px; animation-delay: 7s;"></div>
        <div class="particle" style="left: 90%; width: 4px; height: 4px; animation-delay: 8s;"></div>
    </div>

    <div class="container">
        <div class="header">
            <h2>Job Applications</h2>
            <a href="admin_logout.php" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </a>
        </div>

        <div class="stats-bar">
            <i class="fas fa-chart-line"></i>
            Total Applications: <?= $result->num_rows ?>
        </div>

        <div class="table-container">
            <table>
                <tr>
                    <th><i class="fas fa-hashtag"></i> ID</th>
                    <th><i class="fas fa-briefcase"></i> Job Title</th>
                    <th><i class="fas fa-user"></i> Full Name</th>
                    <th><i class="fas fa-phone"></i> Phone</th>
                    <th><i class="fas fa-envelope"></i> Email</th>
                    <th><i class="fas fa-file-pdf"></i> Resume</th>
                    <th><i class="fas fa-calendar"></i> Submitted</th>
                </tr>

                <?php while ($row = $result->fetch_assoc()) { ?>
                <tr>
                    <td><span class="id-badge"><?= $row['id'] ?></span></td>
                    <td><span class="job-title"><?= $row['job_title'] ?></span></td>
                    <td><?= $row['full_name'] ?></td>
                    <td><span class="phone"><?= $row['phone'] ?></span></td>
                    <td><span class="email"><?= $row['email'] ?></span></td>
                    <td>
                        <a href="Careerspage/uploads/resumes/<?= basename($row['resume_path']) ?>" target="_blank" class="download-link">
                            <i class="fas fa-download"></i>
                            Download
                        </a>
                    </td>
                    <td><span class="date"><?= $row['submitted_at'] ?></span></td>
                </tr>
                <?php } ?>
            </table>
        </div>
    </div>

    <script>
        // Add some interactive JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Add click sound effect simulation
            const downloadLinks = document.querySelectorAll('.download-link');
            downloadLinks.forEach(link => {
                link.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-2px)';
                    }, 100);
                });
            });

            // Add hover effect to table rows
            const tableRows = document.querySelectorAll('tbody tr');
            tableRows.forEach((row, index) => {
                row.style.animationDelay = `${index * 0.1}s`;
                
                row.addEventListener('mouseenter', function() {
                    this.style.boxShadow = '10px 0 25px rgba(102, 126, 234, 0.15)';
                });
                
                row.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '5px 0 15px rgba(102, 126, 234, 0.1)';
                });
            });

            // Dynamic particle generation
            const particleContainer = document.querySelector('.floating-particles');
            setInterval(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
                particle.style.animationDelay = '0s';
                particleContainer.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 6000);
            }, 2000);
        });
    </script>
</body> 
</html>