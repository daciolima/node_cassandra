import csv
from faker import Faker
import uuid

fake = Faker(['pt_BR'])

# Abrindo arquivo CSV
with open('dados_fake_company.csv', mode='w', newline='') as file:
    writer = csv.writer(file, delimiter=';')

    # Escrevendo cabeçalho
    writer.writerow(['company_id', 'name', 'street', 'number', 'city', 'state', 'postcode', 'country', 'email', 'phone', 'updated_at', 'created_at'])

    # Gerando valores fictícios
    for _ in range(1000):
        company_id = uuid.uuid1()
        name = fake.company()
        street = fake.street_name() 
        number = fake.building_number()
        city = fake.city()
        state = fake.country_code()
        postcode = fake.postcode() 
        country = fake.current_country()
        email = fake.email()
        phone = fake.phone_number()
        updated_at = fake.iso8601()
        created_at = fake.iso8601()
        writer.writerow([company_id, name, street, number, city, state, postcode, country, email, phone, updated_at, created_at])

print("Arquivo dados_fake_company.csv gerado com sucesso.")

