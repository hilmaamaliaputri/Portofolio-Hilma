<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "Form dikirim!<br>";

    $nama  = $_POST['nama'] ?? '';
    $email = $_POST['email'] ?? '';
    $hp    = $_POST['hp'] ?? '';
    $pesan = $_POST['pesan'] ?? '';

    echo "Data diterima: $nama, $email, $hp, $pesan<br>";

    if (empty($nama) || empty($email) || empty($hp) || empty($pesan)) {
        echo "⚠ Harap isi semua field.";
        exit;
    }

    $sql = "INSERT INTO pesan_pengunjung (nama, email, hp, pesan) VALUES ('$nama', '$email', '$hp', '$pesan')";
    
    if (mysqli_query($conn, $sql)) {
        echo "✅ Data berhasil disimpan ke database!";
    } else {
        echo "❌ Gagal menyimpan data: " . mysqli_error($conn);
    }

    mysqli_close($conn);
} else {
    echo "🚫 Metode akses tidak diizinkan.";
}
