package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/cors"
)

func main() {
    // Replace with your MySQL username and password
    db, err := sql.Open("mysql", "root:new_password@tcp(127.0.0.1:3306)/tiktokshop")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    mux := http.NewServeMux()

    mux.HandleFunc("/submit", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == "POST" {
            content := r.FormValue("content")

            _, err := db.Exec("INSERT INTO submissions (content) VALUES (?)", content)
            if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }

            fmt.Fprintf(w, "Content submitted successfully")
        } else {
            http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        }
    })

    handler := cors.Default().Handler(mux)

    fmt.Println("Server running on port 8080...")
    log.Fatal(http.ListenAndServe(":8080", handler))
}
