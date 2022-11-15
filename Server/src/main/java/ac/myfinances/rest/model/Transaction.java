package ac.myfinances.rest.model;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Objects;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import java.io.Serializable;
import javax.validation.Valid;


import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * Transaction
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-11-10T22:47:30.445-05:00[America/New_York]")
@Entity

public class Transaction  implements Serializable {
  private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @JsonProperty("id")
  private String id;

  @JsonProperty("description")
  private String description;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinTable(name = "credit_account_transaction",
    joinColumns =
            { @JoinColumn(name = "transaction_id", referencedColumnName = "id") },
    inverseJoinColumns =
            { @JoinColumn(name = "account_id", referencedColumnName = "id") })
  @JsonProperty("creditAccount")
  private Account creditAccount;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinTable(name = "debit_account_transaction",
    joinColumns =
            { @JoinColumn(name = "transaction_id", referencedColumnName = "id") },
    inverseJoinColumns =
            { @JoinColumn(name = "account_id", referencedColumnName = "id") })
  @JsonProperty("debitAccount")
  private Account debitAccount;

  @JsonProperty("amount")
  private BigDecimal amount;

  @JsonProperty("date")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  @Column(columnDefinition = "datetime(3)")
  private OffsetDateTime date;
  public Transaction id(String id) {
    this.id = id;
    return this;
  }


  /**
   * Get id
   * @return id
  */
  @ApiModelProperty(value = "")


  public String getId() {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Transaction description(String description) {
    this.description = description;
    return this;
  }


  /**
   * Get description
   * @return description
  */
  @ApiModelProperty(value = "")


  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Transaction creditAccount(Account creditAccount) {
    this.creditAccount = creditAccount;
    return this;
  }


  /**
   * Get creditAccount
   * @return creditAccount
  */
  @ApiModelProperty(value = "")

  @Valid

  public Account getCreditAccount() {
    return this.creditAccount;
  }

  public void setCreditAccount(Account creditAccount) {
    this.creditAccount = creditAccount;
  }

  public Transaction debitAccount(Account debitAccount) {
    this.debitAccount = debitAccount;
    return this;
  }


  /**
   * Get debitAccount
   * @return debitAccount
  */
  @ApiModelProperty(value = "")

  @Valid

  public Account getDebitAccount() {
    return this.debitAccount;
  }

  public void setDebitAccount(Account debitAccount) {
    this.debitAccount = debitAccount;
  }

  public Transaction amount(BigDecimal amount) {
    this.amount = amount;
    return this;
  }


  /**
   * Get amount
   * @return amount
  */
  @ApiModelProperty(value = "")


  public BigDecimal getAmount() {
    return this.amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public Transaction date(OffsetDateTime date) {
    this.date = date;
    return this;
  }


  /**
   * Get date
   * @return date
  */
  @ApiModelProperty(value = "")

  @Valid

  public OffsetDateTime getDate() {
    return this.date;
  }

  public void setDate(OffsetDateTime date) {
    this.date = date;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Transaction transaction = (Transaction) o;
    return Objects.equals(this.id, transaction.id) &&
        Objects.equals(this.description, transaction.description) &&
        Objects.equals(this.creditAccount, transaction.creditAccount) &&
        Objects.equals(this.debitAccount, transaction.debitAccount) &&
        Objects.equals(this.amount, transaction.amount) &&
        Objects.equals(this.date, transaction.date);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, description, creditAccount, debitAccount, amount, date);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Transaction {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    creditAccount: ").append(toIndentedString(creditAccount)).append("\n");
    sb.append("    debitAccount: ").append(toIndentedString(debitAccount)).append("\n");
    sb.append("    amount: ").append(toIndentedString(amount)).append("\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

