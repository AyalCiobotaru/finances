package ac.myfinances.generated.model;

import java.util.Objects;
import javax.persistence.Entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.ManyToMany;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*;


import org.hibernate.annotations.GenericGenerator;

/**
 * Transaction
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-11-06T20:19:28.485692-05:00[America/New_York]")
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



  @JsonProperty("credit-account-id")
  private String creditAccountId;



  @JsonProperty("debit-account-id")
  private String debitAccountId;



  @JsonProperty("amount")
  private Float amount;



  @JsonProperty("date")
  @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE)
  private LocalDate date;

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
    return id;
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
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Transaction creditAccountId(String creditAccountId) {
    this.creditAccountId = creditAccountId;
    return this;
  }

  /**
   * Get creditAccountId
   * @return creditAccountId
  */
  @ApiModelProperty(value = "")


  public String getCreditAccountId() {
    return creditAccountId;
  }

  public void setCreditAccountId(String creditAccountId) {
    this.creditAccountId = creditAccountId;
  }

  public Transaction debitAccountId(String debitAccountId) {
    this.debitAccountId = debitAccountId;
    return this;
  }

  /**
   * Get debitAccountId
   * @return debitAccountId
  */
  @ApiModelProperty(value = "")


  public String getDebitAccountId() {
    return debitAccountId;
  }

  public void setDebitAccountId(String debitAccountId) {
    this.debitAccountId = debitAccountId;
  }

  public Transaction amount(Float amount) {
    this.amount = amount;
    return this;
  }

  /**
   * Get amount
   * @return amount
  */
  @ApiModelProperty(value = "")


  public Float getAmount() {
    return amount;
  }

  public void setAmount(Float amount) {
    this.amount = amount;
  }

  public Transaction date(LocalDate date) {
    this.date = date;
    return this;
  }

  /**
   * Get date
   * @return date
  */
  @ApiModelProperty(value = "")

  @Valid

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
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
        Objects.equals(this.creditAccountId, transaction.creditAccountId) &&
        Objects.equals(this.debitAccountId, transaction.debitAccountId) &&
        Objects.equals(this.amount, transaction.amount) &&
        Objects.equals(this.date, transaction.date);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, description, creditAccountId, debitAccountId, amount, date);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Transaction {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    creditAccountId: ").append(toIndentedString(creditAccountId)).append("\n");
    sb.append("    debitAccountId: ").append(toIndentedString(debitAccountId)).append("\n");
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

